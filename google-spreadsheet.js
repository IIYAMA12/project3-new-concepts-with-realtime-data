/*
    90% of this file is from the Google spreadsheet API
    https://developers.google.com/sheets/api/
*/

const googleSpreadsheet = {};

const fs = require("fs");
const readline = require("readline");
const {
    google
} = require("googleapis");
require("dotenv").config()

// If modifying these scopes, delete credentials.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const TOKEN_PATH = "credentials.json";

// Load client secrets from a local file.
fs.readFile("client_secret.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), listMajors);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const {
        client_secret,
        client_id,
        redirect_uris
    } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return callback(err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) console.error(err);
                console.log("Token stored to", TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */

googleSpreadsheet.data = {}; 


// "Waterflow", "Aquaponics Datastream", "Production Aquaponics System"

const spreadsheetTabNames = ["Waterflow", "Aquaponics Datastream", "Production Aquaponics System"]; // , "Hydroponics Datastream (02/20/17 - 03/27/17)""
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

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
// https://gist.github.com/pinalbhatt/9672790



function clearToLastValidRow (spreadsheetTabName, rows) {
    if (spreadsheetRowValidator[spreadsheetTabName] != undefined) {
        for (let index = rows.length - 1; index > -1; index--) {
            const row = rows[index]
            // console.log("index", index);
            
            if (!spreadsheetRowValidator[spreadsheetTabName](row)) {
                console.log("splice", index, row);
                rows.splice(index, 1);
            } else {
                return rows;
            }
        }
    }
}


function listMajors(auth) {
    const refreshData = function () {
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
    }
    refreshData();
    setInterval(refreshData, 20000);
}

module.exports = googleSpreadsheet;