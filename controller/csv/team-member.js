const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require("mongoose");
const mongodb = 'mongodb://localhost:27017/metaco'
mongoose.connect(mongodb, { useNewUrlParser: true })
const db = mongoose.connection

// MODEL
const TeamMembers = require("../../model/team_members.js");

var bacaCsvTeamMembers = () => {
    fs.createReadStream('data/teams-member.csv').pipe(csv()).on('data', (row) => {
        var datanya = new TeamMembers(row)
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

module.exports = bacaCsvTeamMembers