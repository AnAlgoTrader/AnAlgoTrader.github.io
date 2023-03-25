function displayBar(data) {    
    candleStickSeries.update({
        time: data.time,
        open: data.open,
        high: data.high,
        low: data.low,
        close: data.close
    });
}


connection.on("DataChannel", (sender, type, message) => {
    if (sender == "IB.Trader") {
        if (type == "accountUpdate") {
            //var data = JSON.parse(message);
            //displayAccounts(data);
        } else if (type == "tradesUpdate") {
            // _trades = JSON.parse(message);
            // displayTrades(data);
        } else if (type == "portfolioUpdate") {
            // var data = JSON.parse(message);
            // displayPositions(data);
        } else if (type == "tradingHoursUpdate") {
            // var data = JSON.parse(message);
            // displaySession(data);
        } else if (type == "priceUpdate") {
            var data = JSON.parse(message);
            displayBar(data);
        } 
    }
});