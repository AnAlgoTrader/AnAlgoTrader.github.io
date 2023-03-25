var green = 'rgb(38,166,154)';
var red = 'rgb(255,82,82)';
var black = '#000000';
var white = 'rgba(255, 255, 255, 0.9)';
var grey = 'rgba(42, 46, 57, 0.5)';
var yellow = 'rgba(228, 228, 70, 0.8)';

var chart = LightweightCharts.createChart(document.getElementById('candlesContainer'),
    {
        layout: {
            backgroundColor: '#212529',
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
        }
    });

chart.applyOptions({
    timeScale: {
        borderVisible: false,
        borderColor: '#fff000',
        visible: true,
        timeVisible: true,
        minBarSpacing: 0.0,
    }
});

const candleStickSeries = chart.addCandlestickSeries({
    upColor: green,
    downColor: red,
    wickUpColor: green,
    wickDownColor: red,
    borderVisible: false,
    priceLineVisible: false,
});