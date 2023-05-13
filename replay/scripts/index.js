var chart = LightweightCharts.createChart(document.getElementById('chartContainer'),
    {
        layout: {
            background: {
                type: 'solid',
                color: '#000000',
            },
            textColor: 'rgba(255, 255, 255, 0.9)',
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

const lineSeries1 = chart.addLineSeries({
    color: "rgba(255, 211, 75, 1)",
    lineWidth: 1,
});

const lineSeries2 = chart.addLineSeries({
    color: "rgba(138, 171, 238, 1)",
    lineWidth: 1,
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

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function updateSeries() {
    var currentTime = Math.round(new Date().getTime() / 1000);
    lineSeries1.update({
        time: currentTime,
        value: getRandomArbitrary(1, 10)
    });
    lineSeries2.update({
        time: currentTime,
        value: getRandomArbitrary(1, 10)
    });
}

setInterval(updateSeries, 1000);