function loadView(viewName) {
    fetch(viewName)
        .then((response) => response.text())
        .then((html) => {
            document.getElementById("viewContent").innerHTML = html;
        })
        .catch((error) => {
            console.warn(error);
        });
}