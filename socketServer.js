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
let connectedPlayerNames = [];

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


  socket.on("setPlayerName", function(msg, callback) {
    let newName = msg.name.trim();
    if (connectedPlayerNames.includes(newName)){
      callback({ok:false,error:"**name already in use"})
    }
    else if(newName.length < 5 || newName.length>30){
      callback({ok:false,error:"**choose name between 5 and 30 characters"})
    }
    else{
      socket.profile = {};
      socket.profile.name = newName;
      connectedPlayerSockets[socket.id] = socket;
      connectedPlayerNames.push(newName);
      callback({ok:true,error:"",newName:newName,id:socket.id});
      console.log("new player received a name.",socket.id,newName)
    }
  });

  socket.on("disconnect", function() {
    console.log(socket.id,socket.profile.name, " disconnected ");

    //-- remove name from used names list
    var index = connectedPlayerNames.indexOf(socket.profile.name);
    if (index > -1) {
      connectedPlayerNames.splice(index, 1);
    }

    //-- delete player socket
    delete connectedPlayerSockets[socket.id];
  });
});
