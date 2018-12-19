
let socialClass = (function() {

    let myProfile = {};



    let setName = ()=>{
        let boxName = document.getElementById("chosenNameBox").value.trim();
        if(boxName.length < 5 || boxName.length>30){
            document.getElementById("chosenNameBox").style.borderColor="red";

            document.getElementById("error_name").textContent = "**choose name between 5 and 30 characters"
            return false;
        }
        else{
            socket.emit("setPlayerName", { name: boxName }, function(msg) {
                console.log(msg)
                if(msg.ok)
                {
                    myProfile.name = msg.newName;
                    myProfile.id = msg.id;

                    document.getElementById("tr_name_1").innerHTML = '<td>Welcome, <strong>'+myProfile.name+'</strong><td>';
                    document.getElementById("tr_name_2").remove();

                    console.log(myProfile)
                }
                else{
                    document.getElementById("chosenNameBox").style.borderColor="red";
                    document.getElementById("error_name").textContent = msg.error;
                }
              });
        }
    }





    let joinRoom = ()=>{
        let boxRoom = document.getElementById("chosenRoomBox").value.trim();
        if(boxRoom.length < 5 || boxRoom.length>30){
            document.getElementById("chosenRoomBox").style.borderColor="red";
            document.getElementById("error_room").textContent = "**choose room name between 5 and 30 characters"
            return false;
        }
        else{
            socket.emit("joinRoom", { room: boxRoom }, function(msg) {
                console.log(msg)
                if(msg.ok)
                {
                    myProfile.name = msg.newName;
                    myProfile.id = msg.id;
                    myProfile.room = msg.newRoom;

                    document.getElementById("tr_room_1").innerHTML = '<td>You are now in Room: <strong>'+myProfile.room+'</strong><td>';
                    document.getElementById("tr_room_2").remove();
                    document.getElementById("tr_room_3").remove();

                    console.log(myProfile)
                }
                else{
                    document.getElementById("chosenRoomBox").style.borderColor="red";
                    document.getElementById("error_room").textContent = msg.error;
                }
              });
        }
    }







  return {
    setName:setName,
    joinRoom:joinRoom
  };
})();
