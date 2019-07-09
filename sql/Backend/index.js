//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
var pool = require('./pool');
app.set('view engine', 'ejs');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

var dbconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydatabase'
})

dbconnection.connect(function (err) {
    if (err) throw err;
    console.log("Database connection successfull!");
});

var Users = [{
    username: "admin",
    password: "admin"
}]

var students = []

//Route to handle Post Request Call

app.post('/create', function (req, res) {

    console.log("Inside Create Post Request");
    let sql = 'INSERT INTO sqlhomework SET ?';
    let newstudent = {
        student_ID: req.body.StudentID,
        student_Name: req.body.StudentName,
        student_Dept: req.body.StudentDept
    }
    pool.getConnection(function (err, dbconnection) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            dbconnection.query(sql, newstudent, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Invalid Credentials");
                } else {
                    res.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
                    req.session.user = result;
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Successful Login");
                }
            });
        }
    });
})

app.post('/delete', function (req, res) {

    console.log("Inside Delete Post Request");

    console.log(req.body.StudentID);
    var SID_DELETE = req.body.StudentID;
    var sql = "DELETE FROM sqlhomework where STUDENT_ID = " + SID_DELETE;
    pool.getConnection(function (err, dbconnection) {
        if (err) {
            console.log("4");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            dbconnection.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    // res.end("Invalid Credentials");
                } else {
                    console.log("7");
                    console.log(result);
                    res.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
                    req.session.user = result;
                    console.log("9");
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end(JSON.stringify(result));
                }
            });
        }
    });

})

app.post('/login', function (req, res) {

    // var username = req.body.username;
    // var password = req.body.password;
    console.log("Inside Login Post Request");
    //console.log("Req Body : ", username + "password : ",password);
    // console.log("Req Body : ", req.body);
    Users.filter(function (user) {
        if (user.username === req.body.username && user.password === req.body.password) {
            res.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
            req.session.user = user;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Successful Login");
        }
    })


});



//Route to get All students when user visits the Home Page
app.get('/home', function (req, res) {
    console.log("Inside Home Login");
    var sql = "SELECT * FROM sqlhomework";
    pool.getConnection(function (err, dbconnection) {
        if (err) {
            console.log("4");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            console.log("5");
            dbconnection.query(sql, function (err, result) {
                if (err) {
                    console.log("6");
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    // res.end("Invalid Credentials");
                } else {
                    console.log("7");
                    console.log(result);
                    res.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
                    req.session.user = result;
                    console.log("9");
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end(JSON.stringify(result));
                }
            });
        }
    });
    // res.writeHead(200, {
    //     'Content-Type': 'application/json'
    // });
    // console.log("students : ", JSON.stringify(students));

    // res.end(JSON.stringify(students));

})
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");