var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Static files
app.get('/', function(req, res){
	console.log("BASEURL:" + req.originalUrl);
  res.sendFile(__dirname + '/3mmo.html');
});

app.get('/textures/*', function(req, res){
	console.log("texture request:" + req.originalUrl);
  res.sendFile(__dirname + req.originalUrl);
});

app.get('/js/*', function(req, res){
	console.log("js request:" + req.originalUrl);
  res.sendFile(__dirname + req.originalUrl);
});

//User Connection
io.on('connection', function(socket){
  var newuserGuid = guid();
  console.log('a user connected:' + newuserGuid);
  io.emit('PlayerJoined',''+newuserGuid)
  socket.on('PositionUpdate', function(msg){
	io.emit('PositionUpdate',msg);
    console.log('message: ' + msg);
  });
  socket.on('ChatMessage', function(msg){
	io.emit('ChatMessage',msg);
    console.log('message: ' + msg);
  });
});

http.listen(80, function(){
  console.log('listening on *:80');
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4();
}
