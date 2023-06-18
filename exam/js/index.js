async function loadData() {
    let url = 'https://raw.githubusercontent.com/AnAlgoTrader/analgotrader.github.io/main/exam/data/aws.developer.json';
    let data = await (await fetch(url)).json();
    return data;
}

async function main() {
    const data = await loadData();
    $('#question').text(data[0].question);
    $('#answer').text(data[0].answer);
}

async function displayQuestion(searchCriteria) {
    const data = await loadData();
    const found = data.find(element => element.question.includes(searchCriteria));
    if (found) {
        $('#question').text(found.question);
        $('#answer').text(found.answer);
    }
    else {
        $('#question').text("Not found");
        $('#answer').text("");
    }
}

async function setSearchEvent() {
    let inputSearch = $("#searchInput")
    inputSearch.on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {

            displayQuestion(inputSearch.val());
        }
    });
}

setSearchEvent();
main();