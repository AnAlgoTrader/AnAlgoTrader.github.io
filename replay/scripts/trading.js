var ticks = [];
var ticksIndex = 0;
var candleMinute = -1;
var priceLines = [];
var currentAsk = 0.0;
var currentBid = 0.0;
var commission = 2.0;
var multiplier = 2.0;
var quantity = 5;
var trade = null;
const hoursToStartFrom = [7, 8, 9, 10, 11, 12, 13, 14];
const randomHourToStart = hoursToStartFrom[Math.floor(Math.random() * hoursToStartFrom.length)];

var candle = {
    time: 0,
    open: 0,
    high: 0,
    low: 0,
    close: 0
};

document.getElementById("buyBtn").onclick = async () => await buy();
document.getElementById("sellBtn").onclick = async () => await sell();
document.getElementById("closeBtn").onclick = async () => await close();

async function getDataFiles() {
    return fetch("https://raw.githubusercontent.com/AnAlgoTrader/Data/main/files.json")
        .then((response) => { return response.json(); });
}

async function loadData() {
    const files = await getDataFiles();
    const randomFile = files[Math.floor(Math.random() * files.length)];
    return fetch(`https://raw.githubusercontent.com/AnAlgoTrader/Data/main/${randomFile}`)
        .then((response) => response.text())
        .then((data) => {
            return Papa.parse(data, { header: true });
        });
};

async function close() {
    var funds = parseFloat($('#funds').text());
    funds = funds + trade.pnl;
    trade = null;
    $('#funds').text(funds);
    $('#pnlBtn').css("background-color", "gray");
    $('#pnlBtn').html("PnL");
}

async function buy() {
    trade = {
        entryPrice: currentBid,
        side: 'BUY',
        pnl: 0
    };
}

async function sell() {
    trade = {
        entryPrice: currentBid,
        side: 'SELL',
        pnl: 0
    };
}

async function iterateThroughInitialData() {
    const tick = ticks.data[ticksIndex];
    const tickDate = await extractDukascopyDate(tick);
    const hour = tickDate._d.getHours();        
    if (hour < randomHourToStart) {
        updateCandle();
        await iterateThroughInitialData();
    }
}

async function init() {
    $('#funds').text(10000);
    ticks = await loadData();
    await iterateThroughInitialData();
    //setInterval(updateAll, 250);
};

async function extractDukascopyDate(tick) {
    const dukascopyDate = tick["Gmt time"];
    return moment(dukascopyDate, 'DD.MM.YYYY hh:mm:ss.fff');
}

async function updateTradePnl() {
    if (trade) {
        var priceDifference = currentBid - trade.entryPrice;
        var pnl = priceDifference * multiplier * quantity;
        if (trade.side == 'BUY') {
            trade.pnl = pnl - (commission * 3);
        }
        else {
            trade.pnl = (pnl * -1) - (commission * 3);
        }
        var buttonText = `${trade.side}@${parseFloat(trade.entryPrice).toFixed(2)}<br/>${parseFloat(trade.pnl).toFixed(2)}`;
        $('#pnlBtn').html(buttonText);
        var classContent = trade.pnl < 0 ? red : green;
        $('#pnlBtn').css("background-color", classContent);
    }
}

async function updateAll() {
    await updateCandle();
    await updateTradePnl();
}

async function updateCandle() {
    const tick = ticks.data[ticksIndex];
    const tickDate = await extractDukascopyDate(tick);
    const epochTickDate = tickDate.unix();
    const currentMinute = tickDate._d.getMinutes();
    ticksIndex++;

    if (currentMinute != candleMinute) {
        candleMinute = currentMinute;
        candle.time = epochTickDate;
        candle.open = tick.Bid;
        candle.high = tick.Bid;
        candle.low = tick.Bid;
        candle.close = tick.Bid;
    }

    currentAsk = tick.Ask;
    currentBid = tick.Bid;
    candle.high = candle.high > tick.Bid ? candle.high : tick.Bid;
    candle.low = candle.low < tick.Bid ? candle.low : tick.Bid;
    candle.close = tick.Bid;

    candleStickSeries.update(candle);
}

init();