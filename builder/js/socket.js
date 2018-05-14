let socket;

window.addEventListener("load", function () {
    const getUrl = window.location;
    const baseUrl = getUrl .protocol + "//" + getUrl.host.split(":")[0];
    // socket = io.connect(baseUrl + ":3243");
    socket = io.connect("localhost:3243");
});