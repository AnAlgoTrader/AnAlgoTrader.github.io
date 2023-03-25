



//-------------------------------------------------------------------------------------------------
// Connection to server
//-------------------------------------------------------------------------------------------------

function getRequests() {
    var s1 = location.search.substring(1, location.search.length).split('&'),
        r = {}, s2, i;
    for (i = 0; i < s1.length; i += 1) {
        s2 = s1[i].split('=');
        r[decodeURIComponent(s2[0]).toLowerCase()] = decodeURIComponent(s2[1]);
    }
    return r;
};

var queryString = getRequests();
const ip = queryString["i"];
const u = queryString["u"];
const p = queryString["p"];

const connection = new signalR.HubConnectionBuilder()
    .withUrl(`https://${ip}:5556/mainHub`, { accessTokenFactory: async() => await getToken() })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.on("DataChannel", (sender, type, message) => {
    if (sender == "IB.Trader") {
    }
});

async function getToken() {
    const rawResponse = await fetch(`https://${ip}:5556/api/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Username: u, Password: p })
    });
    return await rawResponse.json();
}

async function start() {
    try {
        await connection.start();
        console.log("Client side is connected and ready.");
    } catch (err) {
        console.log(err);
    }
}

connection.onclose(async () => {
    await start();
});
start();