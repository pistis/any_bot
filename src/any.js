const https = require('https');
const express = require('express');
const fs = require('fs');

const sslConfig = require('./config/ssl');

var app = express();

// set SSL
var https_options = {
    ca : fs.readFileSync(sslConfig.CA_PATH, 'utf8'),
    key : fs.readFileSync(sslConfig.KEY_PATH, 'utf8'),
    cert : fs.readFileSync(sslConfig.CERT_PATH, 'utf8')
};

https.createServer(https_options, app).listen(443, function(){
    console.log("Any Bot Server is Running");
});