var macdChart = LightweightCharts.createChart(document.getElementById('macdContainer'),
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

const bigEmaSeries = macdChart.addLineSeries({
    color: yellow,
    lineWidth: 1,
});

function displayMacd(data) {    
    bigEmaSeries.update({
        time: data.Time,
        value: data.BigEma
    });
}