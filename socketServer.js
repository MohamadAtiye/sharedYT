const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const SOCKET_PORT = 8081;

server.listen(SOCKET_PORT, () => {
  console.log("SOCKET.IO now listening at port ", SOCKET_PORT);
});

// io.emit //==> to everyone including sender
// socket.broadcast.emit //==> to everyone except sender
// io.to(targetRoom).emit("roommsg", text); //==> send to room
// io.to(targetSocketID).emit("private", text); //==> send to person (same as room)

let connectedPlayerSockets = [];

io.on("connection", function(socket) {
  console.log(socket.id, " connected");
  connectedPlayerSockets[socket.id] = socket;

  // //joining a room
  // socket.join(roomName, () => {
  //   socket
  //     .to(roomName)
  //     .emit("saySomething", socket.id + " has joined this room");
  // });

  // //leaving a room
  // socket.leave(roomName, () => {
  //   io.to(roomName).emit("saySomething", socket.id + " has left the room");
  // });


  socket.on("saySomething", function(msg, callback) {
    console.log(socket.id," said : "+ JSON.stringify(msg))
    callback("you said : "+ JSON.stringify(msg));
  });

  socket.on("playerControl", function(msg, callback) {
    console.log(socket.id," said : "+ JSON.stringify(msg))

    socket.broadcast.emit("playerControl",msg);
  });



  socket.on("disconnect", function() {
    console.log(socket.id, " disconnected ");
    //-- delete player socket
    delete connectedPlayerSockets[socket.id];
  });
});
