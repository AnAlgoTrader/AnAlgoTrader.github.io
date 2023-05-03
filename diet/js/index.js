anychart.onDocumentReady(function () {
    // add data
    var data = [
        ["19/05/2023", 111],
        ["20/05/2023", 112],
        ["21/05/2023", 109],
        ["22/05/2023", 111],
        ["23/05/2023", 111]
    ];

    // create a data set
    var dataSet = anychart.data.set(data);

    // map the data for all series
    var firstSeriesData = dataSet.mapAs({ x: 0, value: 1 });

    // create a line chart
    var chart = anychart.line();

    // create the series and name them
    var firstSeries = chart.line(firstSeriesData);
    firstSeries.name("Peso");

    // add a legend and customize it
    chart.legend().enabled(true).fontSize(14).padding([10, 0, 10, 0]);

    // name the axes
    chart.yAxis().title("Peso");

    // customize the series markers
    firstSeries.hovered().markers().type("circle").size(4);

    // turn on crosshairs and remove the y hair
    chart.crosshair().enabled(true).yStroke(null).yLabel(false);

    // change the tooltip position
    chart.tooltip().positionMode("point");
    chart.tooltip().position("right").anchor("left-center").offsetX(5).offsetY(5);

    // customize the series stroke in the normal state
    firstSeries.normal().stroke("#7b60a2", 2.5);

    // specify where to display the chart
    chart.container("weightChart");

    // draw the resulting chart
    chart.draw();

});