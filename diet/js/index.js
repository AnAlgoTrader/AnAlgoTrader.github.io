anychart.onDocumentReady(function () {
    anychart.data.loadJsonFile("https://raw.githubusercontent.com/AnAlgoTrader/analgotrader.github.io/main/diet/data/data.json", function (data) {

        // create a data set
        var dataSet = anychart.data.set(data);

        // map the data for all series
        var firstSeriesData = dataSet.mapAs({ x: 0, value: 1 });
        var secondSeriesData = dataSet.mapAs({ x: 0, value: 2 });

        // create a line chart
        var chart = anychart.line();

        // create the series and name them
        var firstSeries = chart.line(firstSeriesData);
        firstSeries.name("Peso");

        var secondSeries = chart.column(secondSeriesData);
        secondSeries.name('Cintura');

        // add a legend and customize it
        chart.legend().enabled(true).fontSize(14).padding([10, 0, 10, 0]);

        // name the axes
        chart.legend().enabled(true);

        // customize the series markers
        firstSeries.hovered().markers().type("circle").size(4);
        secondSeries.hovered().markers().type("circle").size(4);

        // turn on crosshairs and remove the y hair
        chart.crosshair().enabled(true).yStroke(null).yLabel(false);

        // change the tooltip position
        chart.tooltip().positionMode("point");
        chart.tooltip().position("right").anchor("left-center").offsetX(5).offsetY(5);

        // customize the series stroke in the normal state
        firstSeries.normal().stroke("#ddc0a9", 2.5);
        secondSeries.normal().stroke("#0073e6", 2.5);

        // specify where to display the chart
        chart.container("weightChart");
        chart.background().fill("#302f2f 0.2");

        var xLabels = chart.xAxis().labels();
        xLabels.enabled(false);

        // draw the resulting chart
        chart.draw();
    });
});