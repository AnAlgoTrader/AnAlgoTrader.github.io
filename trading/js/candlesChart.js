var green = 'rgb(38,166,154)';
var red = 'rgb(255,82,82)';
var black = '#212529';
var white = 'rgba(255, 255, 255, 0.9)';
var grey = 'rgba(42, 46, 57, 0.5)';
var yellow = 'rgba(228, 228, 70, 0.8)';

var candlesChart = LightweightCharts.createChart(document.getElementById('candlesContainer'),
    {
        layout: {
            backgroundColor: black,
            textColor: white,
        },
        grid: {
            vertLines: {
                visible: false,
            },
            horzLines: {
                color: grey,
            },
        },
        crosshair: {
            mode: LightweightCharts.CrosshairMode.Normal,
        },
        timeScale: {
            borderVisible: false,
            borderColor: '#fff000',
            visible: true,
            timeVisible: true,
            minBarSpacing: 0.0,
        }
    });

const candleStickSeries = candlesChart.addCandlestickSeries({
    upColor: green,
    downColor: red,
    wickUpColor: green,
    wickDownColor: red,
    borderVisible: false,
    priceLineVisible: false,
});

function displayBar(data) {    
    candleStickSeries.update({
        time: data.time,
        open: data.open,
        high: data.high,
        low: data.low,
        close: data.close
    });
}