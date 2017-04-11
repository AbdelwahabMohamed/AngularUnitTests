var express = require('express');
var path = require('path');
var app = express();

app.use( express.static(__dirname + '/src'));
//add this so the browser can GET the bower files
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/lib', express.static(__dirname + '/lib'));

var server = app.listen((process.env.port || 3001), function(){
    var port = server.address().port;
    console.log('Example app is listening on ', port);    
});