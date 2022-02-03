const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require("mongoose");
const mongodb = 'mongodb://localhost:27017/metaco'
mongoose.connect(mongodb, { useNewUrlParser: true })
const db = mongoose.connection

// MODEL
const Tournament = require("../../model/tournament.js");

var bacaCsvTournament = () => {
    fs.createReadStream('data/tournament.csv').pipe(csv()).on('data', (row) => {
        var datanya = new Tournament(row)
        datanya.save(function (err, dta) {
            if (err) {
                console.log(err)
            } else {
                console.log("saved to collection.")
            }
        });
    }).on('end', () => {
        console.log('CSV file successfully processed');
    });
}

module.exports = bacaCsvTournament