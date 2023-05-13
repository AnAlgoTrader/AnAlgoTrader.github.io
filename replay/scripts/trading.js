var ticks = [];
async function loadData() {
    return fetch("https://raw.githubusercontent.com/AnAlgoTrader/Data/main/USATECH.IDXUSD_Ticks_06.03.2023-06.03.2023.csv")
        .then((response) => response.text())
        .then((data) => {
            return Papa.parse(data, { header: true });
        });
};

async function init() {
    ticks = await loadData();
    console.log(ticks);
};

init();