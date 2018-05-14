# project3: How did I get on your plate?
This experimental application is created to inspire the De Ceuvel company on how they can inform the clients about how their food did end up on their plate.


## Table of contents



![Cover](readme-content/cover.svg)

## Concept of navigating
Let the user go through the water-cycle/life-cycle of their food, 
by using the orientation of a mobile device. 

### Source
`Water-cycle > water flow > direction > device orientation`

![Concept](readme-content/concept.svg)

### Zero-state

`In order to navigate, you have to tilt the device a small amount to the left or right. Max 45° to the left or right.`

`Keep it in the same position until the page has been changed. Return the device orientation back to it's original state to stop the page from changing.`


![Split content](readme-content/split-content.svg)

## Realtime data 

### Google spreadsheet

Most of the code for the request of the spreadsheet data is already delivered by Google. These examples can be found with the link below.
[Google spreadsheet api](https://developers.google.com/sheets/api/)


#### Load the spreadsheet tabs
```JS
const spreadsheetTabNames = ["Waterflow", "Aquaponics Datastream", "Production Aquaponics System"]; 

/*
    ...
*/

googleSpreadsheet.data = [];
for (let index = 0; index < spreadsheetTabNames.length; index++) {
    const spreadsheetName = spreadsheetTabNames[index];
    const sheets = google.sheets({
        version: "v4",
        auth
    });
    sheets.spreadsheets.values.get({
        spreadsheetId: process.env.google_doc,
        range: spreadsheetName,
    }, (err, {
        data
    }) => {
        if (err) return console.log("The API returned an error: " + err);
        if (data.values.length) {
            const rows = clearToLastValidRow(spreadsheetName, data.values);
            if (rows != undefined) {
                const newObject = {name: spreadsheetName, rows: rows};
                googleSpreadsheet.data[spreadsheetName] = newObject
                googleSpreadsheet.callBack(newObject);
            }
        }
    });
}
```

#### Get from the spreadsheet the last valid row. 

```JS
function clearToLastValidRow (spreadsheetTabName, rows) {
    if (spreadsheetRowValidator[spreadsheetTabName] != undefined) {
        for (let index = rows.length - 1; index > -1; index--) {
            const row = rows[index]
            
            if (!spreadsheetRowValidator[spreadsheetTabName](row)) {
                rows.splice(index, 1);
            } else {
                return rows;
            }
        }
    }
}
```

The validate functions:
```JS
const spreadsheetRowValidator = {
    ["Waterflow"] : function (row) {
        
        row[4] = parseFloat(row[4]);

        if (row[3] != "" && row[3] != undefined && row[4] != "" && row[4] != undefined && isNumeric(row[4])) { // 
            return true;
        }
        return false;
    },
    ["Aquaponics Datastream"] : function (row) {
        row[2] = parseFloat(row[2]);
        row[4] = parseFloat(row[4]);
        row[6] = parseFloat(row[6]);
        row[7] = parseFloat(row[7]);
        row[8] = parseFloat(row[8]);
        row[10] = parseFloat(row[10]);
        if (row[0] != "" && isNumeric(row[2]) && row[3] != "" && row[3] != undefined && isNumeric(row[4]) && isNumeric(row[6])&& isNumeric(row[7])&& isNumeric(row[8])&& isNumeric(row[10])) {
            return true;
        }
        return false;
    },
    ["Production Aquaponics System"] : function (row) {
        row[3] = parseFloat(row[3]);
        row[4] = parseFloat(row[4]);
        row[5] = parseFloat(row[5]);
        const validYield = {
            "low": true,
            "medium": true,
            "high": true
        };
        if (row[0] != "" && row[0] != undefined && row[1] != "" && row[1] != undefined && validYield[row[1].toLowerCase()] && isNumeric(row[3]) && isNumeric(row[4]) && isNumeric(row[5])) {
            row[1] = row[1].toLowerCase();
            return true;
        }
        return false;
    }
}
```

### Socket serverside

#### Update the spreadsheet data for every connected client
```JS
googleSpreadsheet.callBack = function (item) {
    const rows = item.rows;
    const name = item.name;
    const lastRow = rows[rows.length - 1];
    io.sockets.emit("data-stream_s", name, lastRow);
};
```


#### Send the spreadsheet data to a new connected client

```JS
const socketApp = require("express")();
const server = require("http").Server(socketApp);
const io = require("socket.io")(server);

server.listen(3243);

io.on("connection", function (socket) {
    const object = googleSpreadsheet.data;
    for (const name in object) {
        const lastRow = object[name].rows[object[name].rows.length - 1];
        if (lastRow != undefined) {
            socket.emit("data-stream_s", name, lastRow);
        }
    }
});
```


### Socket clientside
```JS
let socket;
const socketStreamData = {};


window.addEventListener("load", function () {
    const getUrl = window.location;
    const baseUrl = getUrl.protocol + "//" + getUrl.host.split(":")[0];
    socket = io.connect(baseUrl + ":3243");

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

            const plantsContainerElement = document.getElementById("plants");
            if (plantsContainerElement != undefined) {
                const table = plantsContainerElement.getElementsByTagName("table")[0];
                if (table != undefined) {
                    const dataElements = table.getElementsByTagName("td");
                    dataElements[0].textContent = data[3] + "x plants"; 
                    dataElements[1].textContent = data[4] + "x plants";
                    dataElements[2].textContent = data[5] + "x plants";
                }
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
```



## Experiment with animation types

### CSS animation. 

```CSS
@keyframes waves-animation-show {
    0% {
        transform: translateY(-50vh);
        visibility: visible;
    }
    100% {
        transform: translateY(0px);
        visibility: visible;
    }
}
animation: waves-animation-show 0.5s;
animation-fill-mode: forwards;
```

Used mostly for hiding and showing content.


### SVG animation.
```XML
<animateTransform attributeName="transform"
    attributeType="XML"
    type="translate"
    from="0 -60"
    to="0 200"
    dur="1.23s"
    begin="0s;op.end+4.36s"
    repeatCount="indefinite"/>
```

Used for animating background images.



### JS + CSS animation.
```JS
const handleOrientation = function (event) {
    
    /* 
        ... 
    */

    const absolute = event.absolute;
    const alpha    = Math.floor(event.alpha + 0.5);
    let beta     = Math.floor(event.beta + 0.5);
    let gamma    = Math.floor(event.gamma + 0.5);
    
    /* 
        ... 
    */

    document.getElementById("main-background").style.transform = "rotate(" + -gamma + "deg)";

    const deviceOrientationSVG = document.getElementById("device-orientation-indicator").getElementsByTagName("svg")[0];

    deviceOrientationSVG.style.transform = "translate(calc(" + (gamma + 90 / 180 * 100) + "vw - 1.5rem)";
    /* 
        ... 
    */
}    
window.addEventListener("deviceorientation", handleOrientation, true);
```



Used for applying the device orientation to the html components.


## Todo
- [ ] Performance update for CSS + SVG + JS animations. 
- [ ] Build for landscape orientation as well.
- [ ] Support tablets.
- [ ] Improve progressive enhancement.
- [ ] Update code events for the future.
