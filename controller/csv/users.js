const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require("mongoose");
const mongodb = 'mongodb://localhost:27017/metaco'
mongoose.connect(mongodb, { useNewUrlParser: true })
const db = mongoose.connection

// MODEL
const Users = require("../../model/users.js");
const Tournament = require("../../model/tournament.js");

var bacaCsvUser = () => {
    fs.createReadStream('data/users.csv').pipe(csv()).on('data', (row) => {
        console.log(row)

        var datanya = new Users(row)
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

module.exports = bacaCsvUser