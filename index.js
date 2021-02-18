const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require("fs");
const morgan = require('morgan')
const bodyParser = require("body-parser")

const models = './app/models';
const routes = './app/routes';
const { Worker } = require('worker_threads');
new Worker(path.resolve(__dirname,"./app/workers/cpuMonit.js"));

const app = express(); 

 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

fs.readdirSync(models).forEach(function (file) {
    if (file.indexOf('.js')) require(models + '/' + file)
});

fs.readdirSync(routes).forEach(function (file) {
    if (file.indexOf('.js')) {
        let route = require(routes + '/' + file);
        route.setRouter(app);
    }
});
app.use(morgan("common"))
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
   res.header('Access-Control-Allow-Credentials', true);
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
   next();
});



const server = http.Server(app);

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log('mongoose connection open handler', err)
    } else {
        console.log('mongoose connection open');
        server.listen(3000);
        server.on('error', onError);
        server.on('listening', onListening);
     }
});

 
function onError(error) {
    console.log(error.message);
}

function onListening() {

    var addr = server.address();
    console.log(`server listening on port ${addr.port}`)
 
}




module.exports = app;