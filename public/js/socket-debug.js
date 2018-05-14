let socket;
const socketStreamData = {};


window.addEventListener("load", function () {
    const getUrl = window.location;
    const baseUrl = getUrl.protocol + "//" + getUrl.host.split(":")[0];
    socket = io.connect(baseUrl + ":3243");
    // socket = io.connect("localhost:3243");

    socket.on("data-stream_s", function (name, data) {
        socketStreamData[name] = data;
        updateOnDataChange(name, data);
    });
});

const updateOnDataChange = (function () {
    const updateFunctions = {
        ["Production Aquaponics System"] : function (data) {
            if (data[1] != undefined && data[1] != "") {
                const yieldStatus = data[1].toLowerCase();
                document.getElementById("crop-yield").setAttribute("yield", yieldStatus);
            }
        }
    }
    const updateOnDataChange = function  (name, data) {
        const updateFunction = updateFunctions[name];
        if (updateFunction != undefined) {
            updateFunction(data);
        }
    }
    return updateOnDataChange;
})();

