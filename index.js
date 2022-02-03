const express = require('express')
const app = express()
const port = 3210

var bacaCsvUser = require('./controller/csv/users.js');
var bacaCsvTournament = require('./controller/csv/tournament.js');
var bacaCsvTeams = require('./controller/csv/teams.js');
var bacaCsvTeamMember = require('./controller/csv/team-member.js');

app.get('/', (req, res) => {
    res.send('tesssss')
})

// baca csv file
app.get('/a', bacaCsvUser)
app.get('/b', bacaCsvTournament)
app.get('/c', bacaCsvTeams)
app.get('/d', bacaCsvTeamMember)



// 
app.listen(port, () => {
    console.log('Server berjalan di localhost:'+port)
})