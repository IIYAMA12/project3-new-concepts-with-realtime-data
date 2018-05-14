// Request modules
const 
    path = require("path"),
    express = require("express"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    minifyHTML = require("express-minify-html"),
    ejs = require("ejs"),
    googleSpreadsheet = require("./google-spreadsheet")
;




googleSpreadsheet.callBack = function (item) {
    const rows = item.rows;
    const name = item.name;
    const lastRow = rows[rows.length - 1];
    console.log("lastRow", lastRow, "of", name);
    io.sockets.emit("data-stream_s", name, lastRow);
    // Print columns A and E, which correspond to indices 0 and 4.
    // rows.map((row) => {
    //     // console.log(`${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}, ${row[4]}`);
    // });
};


const socketApp = require("express")();
const server = require("http").Server(socketApp);
const io = require("socket.io")(server);

server.listen(3243);

io.on("connection", function (socket) {
    const object = googleSpreadsheet.data;
    for (const name in object) {
        socket.emit("data-stream_s", name, object[name], "connected");
    }
});

var sess = {
    secret: "gfjisdhu5yvdist4fvhsdyutg47sydiywe45iadhwo8",
    cookie: {},
    resave: true,
    saveUninitialized: true
}


const app = express();

app.use(minifyHTML({
    override:      true,
    exception_url: false,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true
    }
}));

app.use(session(sess));

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Define bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));




app.get("*", function(req, res, next) {
    res.locals.templateData = {};

    next();
});

app.get("/", function (req, res) {
    res.render("pages/index/index");
});



// Routers
const routers = {
    init: function () {
        const path = this.path;
        const allData = this.allData;
        for (var i = 0; i < allData.length; i++) {
            const data = allData[i];
            var module = require(path + data.path + "/" + data.fileName);
            app.use(data.path, module);
        }
        delete this.init;
    },
    path: "./routers",
    allData: [
        // {
        //     path: "/portfolio",
        //     fileName: "portfolio"
        // }
    ]
};
routers.init();





// Start server
app.listen(3000, function() {
    console.log("Portfolio APP listening at http://localhost:3000/");
});
