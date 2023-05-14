var ticks = [];
var ticksIndex = 0;
var candleMinute = -1;
var priceLines = [];
var currentAsk = 0.0;
var currentBid = 0.0;
var commission = 2.0;
var multiplier = 2.0;
var quantity = 5;

var candle = {
    time: 0,
    open: 0,
    high: 0,
    low: 0,
    close: 0
};

document.getElementById("buyBtn").onclick = async () => await buy();
document.getElementById("sellBtn").onclick = async () => await sell();

async function loadData() {
    return fetch("https://raw.githubusercontent.com/AnAlgoTrader/Data/main/USATECH.IDXUSD_Ticks_06.03.2023-06.03.2023.csv")
        .then((response) => response.text())
        .then((data) => {
            return Papa.parse(data, { header: true });
        });
};

async function buy() {
}

async function sell() {
}

async function iterateThroughInitialData() {
    const tick = ticks.data[ticksIndex];
    const tickDate = await extractDukascopyDate(tick);
    const hour = tickDate._d.getHours();
    if (hour < 9) {
        updateCandle();
        await iterateThroughInitialData();
    }
}

async function init() {
    ticks = await loadData();
    await iterateThroughInitialData();
    var priceScale = candleStickSeries.priceScale();
    console.log(priceScale);
    //setInterval(updateAll, 500);
};

async function extractDukascopyDate(tick) {
    const dukascopyDate = tick["Gmt time"];
    return moment(dukascopyDate, 'DD.MM.YYYY hh:mm:ss.fff');
}

async function updateAll() {
    await updateCandle();
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