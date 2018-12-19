
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







  return {
    setName:setName
  };
})();
