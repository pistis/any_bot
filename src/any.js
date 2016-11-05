const https = require('https');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const sslConfig = require('./config/ssl');

var app = express();

app.use(bodyParser.json());

app.get('/hook', function(reqeust, response){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.end('<h1>Any - vamalboro@gmail.com<h1>');
});

app.post('/hook', function(request, response){

    var eventObj = request.body.events[0];
    var source = eventObj.source;
    var message = eventObj.message;

    // request log
    console.log('======================', new Date(), '======================');
    console.log('[request]', request.body);
    console.log('[request source] ', eventObj.source);
    console.log('[request message]', eventObj.message);

    response.sendStatus(200);
});

// set SSL
var https_options = {
    ca : fs.readFileSync(sslConfig.CA_PATH, 'utf8'),
    key : fs.readFileSync(sslConfig.KEY_PATH, 'utf8'),
    cert : fs.readFileSync(sslConfig.CERT_PATH, 'utf8')
};

https.createServer(https_options, app).listen(443, function(){
    console.log("Any Bot Server is Running");
});