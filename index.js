const http = require('http');
const express = require('express');
const { send } = require('process');
const { query } = require('express');
const e = require('express');
const app = express();
const bodyParser = require("body-parser")
const port = process.env.PORT || 3000;

// New app using express module
app.use(bodyParser.urlencoded({
    extended: true
}));

const mysql = require("./connection").con;

// configure
app.set("view engine", "hbs");
app.set("views", "./screen")
app.use(express.static(__dirname + '/public'));


const server = http.createServer(app);
app.listen(port);

app.set("view engine", "hbs");
app.set("views", "./screen")
app.use(express.static(__dirname + '/css'));


app.get("/", (req, res) => {
    res.render("./index")
});

app.get("/index", (req, res) => {
    res.render("./index")
});

app.get("/contact", (req, res) => {
    res.render("./contact")
    
});

app.post("/myform", (req, res) => {
    const { name, email, phone, message } = req.body; 

    var qur = "SELECT * FROM `portfolio_table` WHERE `Name`=? or  `Email`=? or `phone`=? "
    mysql.query(qur, [name, email, phone], (err, results) => {
        if (err) {
            throw err;
        }
        else {
            if (results.length > 0 ) {
                res.render("./contact", { msg1: true });
            } else {
                var qur2 = "INSERT INTO `portfolio_table`(`Name`, `Email`, `Phone`, `Message`) VALUES(?, ?, ?, ?)"
                mysql.query(qur2, [name, email, phone, message], (err, results) => {
                    if (err) {
                        throw err;
                    } else {
                        res.render("./contact",{msg:true,msg1:false});
                    }
                })
            }
        }
    })
})




