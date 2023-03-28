var stochasticChart = LightweightCharts.createChart(document.getElementById('stochasticContainer'),
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

const stochasticSeries = stochasticChart.addLineSeries({
    color: red,
    lineWidth: 1,
});

function displayStochastic(data) {    
    stochasticSeries.update({
        time: data.Time,
        value: data.Value
    });
}