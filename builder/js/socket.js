let socket;
const socketStreamData = {};


window.addEventListener("load", function () {
    const getUrl = window.location;
    const baseUrl = getUrl.protocol + "//" + getUrl.host.split(":")[0];
    socket = io.connect(baseUrl + ":3243");
    // socket = io.connect("localhost:3243");

    socket.on("data-stream_s", function (name, data) {
        socketStreamData[name] = data;
    });
});


