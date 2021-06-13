var firebaseConfig = {
      apiKey: "AIzaSyDK7UZQbFrhiVu6eRUKBQ2sV9l4t3ZzDAM",
      authDomain: "kwitter-189ae.firebaseapp.com",
      databaseURL: "https://kwitter-189ae-default-rtdb.firebaseio.com",
      projectId: "kwitter-189ae",
      storageBucket: "kwitter-189ae.appspot.com",
      messagingSenderId: "745681927473",
      appId: "1:745681927473:web:40544d41215d54a309c410"
};
firebase.initializeApp(firebaseConfig);

var user_name = localStorage.getItem("Username");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";


function addRoom()
{
      var room_name = document.getElementById("room_name").value;

      firebase.database().ref("/").child(room_name).update({
            purpose: "Adding Room Name"
      });

      localStorage.setItem("Room Name" , room_name);
      window.location= "kwitter_page.html";
}

function getData() 
{
      firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+ Room_names +"  onclick='redirectToRoomName(this.id)'>"+Room_names+"</div><hr>";
      document.getElementById("output").innerHTML += row;
});});
}

getData();

function redirectToRoomName(name)
{
      console.log(name);
      localStorage.setItem("room_name" , name);
      window.location = "kwitter_page.html";
}

function logout()
{
      localStorage.removeItem("Username");
      localStorage.removeItem("Room Name");
      window.location = "index.html";
}
