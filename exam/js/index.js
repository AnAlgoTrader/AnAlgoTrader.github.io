async function loadData() {
    let url = 'https://raw.githubusercontent.com/AnAlgoTrader/analgotrader.github.io/main/exam/data/aws.developer.json';
    data = await (await fetch(url)).json();
    return data;
}

async function main(){
    data = await loadData();
    $('#question').text(data[0].question);
    $('#answer').text(data[0].answer);
}

main();