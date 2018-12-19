var socket = io("http://localhost:8081");

document.addEventListener("DOMContentLoaded", () => {

  socket.emit("saySomething", { data: "this is a test" }, function(msg) {
    console.log(msg);
  });

  socket.on("saySomething", function(msg) {
    console.log(msg);
  });

  socket.on("playerControl", function(msg) {
    videoClass.receiveCMD(msg);
  });
});