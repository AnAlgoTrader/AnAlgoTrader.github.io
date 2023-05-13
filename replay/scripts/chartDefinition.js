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
