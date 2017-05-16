/**
 * Created by Philipp on 24.02.2017.
 */
"use strict";

var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var port = 3000;
var connection = mysql.createConnection({

    host : 'localhost',
    user : 'root',
    password : 'SQLPass55',
    database : 'personalDiary'

});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();

});

app.post("/entries",function (req,res) {

    console.log("getting Entries...");
    var limit = req.body.limit;

    try {
        connection.query('SELECT * FROM diaryentry AS entry ORDER BY creationTime DESC LIMIT '+limit,function (error, results, fields) {
            if (error) {
                console.log(error);
            }
            res.send(results);
        });

    } catch (e) {
        console.log(e);
    }
});



app.post("/newEntry",function (req,res) {

    console.log("Trying to Insert new Entry....");

    var sql = "INSERT INTO diaryentry(creationTime,entry) VALUES(NOW(),?)";
    var query = mysql.format(sql, req.body.entry);

    try {
        connection.query(query, function (error, results, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("new Entry Created");
                console.log("getting Entries...");
                connection.query('SELECT * FROM diaryentry AS entry ORDER BY creationTime DESC', function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                    res.send(results);
                });
            }
        });

    } catch (e) {
        console.log(e);
    }


});


app.listen(port);
console.log("listening on Port: "+port);
