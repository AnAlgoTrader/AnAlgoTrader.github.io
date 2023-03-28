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