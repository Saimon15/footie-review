'use strict';

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

setInterval(() => io.emit('time', new Date().toTimeString()), 30000);
