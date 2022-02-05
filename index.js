const express = require('express')
const cors = require('cors')
const uuid = require('uuid');
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000;

var bacaCsvUser = require('./controller/csv/users.js');
var bacaCsvTournament = require('./controller/csv/tournament.js');
var bacaCsvTeams = require('./controller/csv/teams.js');
var bacaCsvTeamMember = require('./controller/csv/team-member.js');

// untuk cors
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('tesssss')
})

// baca csv file
app.get('/a', bacaCsvUser)
app.get('/b', bacaCsvTournament)
app.get('/c', bacaCsvTeams)
app.get('/d', bacaCsvTeamMember)

// API
const Teams = require("./model/teams.js");
const Tournament = require("./model/tournament.js");
const TournamentResult = require("./model/tournament_results.js");

app.get('/list-team', (req, res) => {
    Teams.find(function (err, data) {
        if (err) {
            res.send(err)
        } else {
            // res.json(data)
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        }
    })
})

app.get('/list-tournament', (req, res) => {
    Tournament.find(function (err, data) {
        if (err) {
            res.send(err)
        } else {
            // res.json(data)
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        }
    })
})

app.post('/post-result', (req, res) => {

    if (req.body.data_team !== '' && req.body.data_position !== '' && req.body.data_tournament !== '') {

        TournamentResult.find(function (err, dta) {
            if (err) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ kode: 1, pesan: err }));
            } else {
                var poin = 2
                if (req.body.data_position === '1') {
                    poin = 5
                } else if (req.body.data_position === '2') {
                    poin = 3
                }

                Teams.find({ id: req.body.data_team }, function (err, dtTeam) {
                    if (err) {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ kode: 1, pesan: 'Data Team tidak ditemukan' }));
                    } else {

                        Tournament.find({ id: req.body.data_tournament }, function (err, dtTournament) {
                            if (err) {
                                res.setHeader('Content-Type', 'application/json');
                                res.send(JSON.stringify({ kode: 1, pesan: 'Data Tournament tidak ditemukan' }));
                            } else {
                                var isi = new TournamentResult({
                                    id: uuid.v4(),
                                    team_data: dtTeam,
                                    position: req.body.data_position,
                                    point: poin,
                                    tournament_data: dtTournament,
                                    created_at: new Date(),
                                    updated_at: new Date(),
                                })

                                isi.save(function (err, dt) {
                                    if (err) {
                                        res.setHeader('Content-Type', 'application/json');
                                        res.send(JSON.stringify({ kode: 3, pesan: err }));
                                    } else {
                                        res.setHeader('Content-Type', 'application/json');
                                        res.send(JSON.stringify({ kode: 4, pesan: 'Berhasil tambah data' }));
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ kode: 5, pesan: 'Form tidak boleh kosong' }));
    }
})

app.get('/list-result-tournament', (req, res) => {
    TournamentResult.find(function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        }
    })
})

app.get('/result-tournament-detail', (req, res) => {
    TournamentResult.find({ id: req.query.id }, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        }
    })
})

app.post('/post-update-result', (req, res) => {

    if (req.body.detail_id !== '' && req.body.data_position !== '') {

        var poin = 2
        if (req.body.data_position === '1') {
            poin = 5
        } else if (req.body.data_position === '2') {
            poin = 3
        }

        TournamentResult.findOneAndUpdate({ id: req.body.detail_id }, { position: req.body.data_position, point: poin, updated_at: new Date() }, function (err, dta) {
            if (err) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ kode: 1, pesan: err }));
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ kode: 4, pesan: 'Berhasil update data' }));
            }
        });
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ kode: 5, pesan: 'Form tidak boleh kosong' }));
    }
})

app.get('/delete-tournament', (req, res) => {
    TournamentResult.find({ id: req.query.id }, function (err, data) {
        if (err) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ kode: 10, pesan: err }));
        } else {
            if (data.length > 0) {
                TournamentResult.remove({ id: req.query.id }, function (err, data) {
                    if (err) {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ kode: 11, pesan: err }));
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ kode: 12, pesan: 'Data berhasil dihapus' }));
                    }
                })
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ kode: 9, pesan: 'Data tidak ditemukan' }));
            }
        }
    })
})

app.get('/leaderboard', (req, res) => {
    TournamentResult.aggregate(
        [
            {
                $group: {
                    _id: "$team_data.name",
                    total: {
                        $sum: "$point"
                    }
                },
            },
            {
                $sort: { 
                    "total": -1
                },
            }
        ],
        function (err, result) {
            if (err) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ kode: 9, pesan: err }));
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(result));
            }
        }
    );
})


// 
app.listen(port, () => {
    console.log('Server berjalan di localhost:' + port)
})