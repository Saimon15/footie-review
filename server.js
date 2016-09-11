/*'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
  io.emit('chat message', 'get down wid it');
 socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: '+msg);
  });
});


*/

var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

var io = require('socket.io')(server);

app.use(express.static("./views"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function (req, res) {
    var path = __dirname + '/index.html';
    console.log(path);
    res.sendFile(path);
});

io.on('connection', function(socket) {
	socket.emit('chat message', 'get down wid it');
    socket.on('beep', function(){
        socket.emit("beep", {data: 5});
        console.log('beep recieved');
    });
});