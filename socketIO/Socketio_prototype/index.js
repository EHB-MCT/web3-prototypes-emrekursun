// Setup basic express server
var express = require('express');
var app = express();
var fs = require('fs');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var uuid = require('node-uuid');
var port = process.env.PORT || 3001;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
  fs.writeFileSync(__dirname + '/start.log', 'started'); 
});

// Routing
app.use(express.static(__dirname)); 

// Entire GameCollection Object holds all games and info

var gameCollection =  new function() {

  this.totalGameCount = 0,
  this.gameList = {}

};



// Generate a v1 (time-based) id
var timeBasedID = uuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

// Generate a v4 (random) id
var randomID = uuid.v4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

var url = 'http://10.3.210.135:3001/' + randomID // or + timeBasedID
// console.log(url);

// Chatroom

var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });

  //when the client  requests to make a Game
  socket.on('makeGame', function () {

     var gameId = (Math.random()+1).toString(36).slice(2, 18);
     console.log("Game Created by "+ socket.username + " w/ " + gameId);
     gameCollection.gameList.gameId = gameId
     gameCollection.gameList.gameId.playerOne = socket.username;
     gameCollection.gameList.gameId.open = true;
     gameCollection.totalGameCount ++;
     gameCollection.totalGameCount;

    io.emit('gameCreated', {
      username: socket.username,
      gameId: gameId
    });

  });


});




//Join a Game
  function joinGame(username, game) {


  if (game.player2 !== null) {
    game.player2 = username;
  } 
  else {
    alert("Game "+game.id+ " Already Has Max Players" )
  }

}

