//YOUR FIRE BASE LINKS

// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyDK7UZQbFrhiVu6eRUKBQ2sV9l4t3ZzDAM",
      authDomain: "kwitter-189ae.firebaseapp.com",
      databaseURL: "https://kwitter-189ae-default-rtdb.firebaseio.com",
      projectId: "kwitter-189ae",
      storageBucket: "kwitter-189ae.appspot.com",
      messagingSenderId: "745681927473",
      appId: "1:745681927473:web:40544d41215d54a309c410"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

          user_name = localStorage.getItem("Username");
          room_name = localStorage.getItem("room_name");
    
    function send()
    {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
       });
    
      document.getElementById("msg").value = "";
    }
    
    function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
             firebase_message_id = childKey;
             message_data = childData;
    //Start code
    console.log(firebase_message_id);
    console.log(message_data);
    var name = message_data['name'];
    var message = message_data['message'];
    var likes = message_data['like'];
    var name_with_tag = "<h4> " + name + "<img src='tick.png' style='width:20px;'></h4>";
    var message_with_tag = "<h4>" + message + "</h4>";
    var likes_with_tag = "<button class='btn' id='"+firebase_message_id+"' value='"+likes+"' onclick='update_like(this.id)'>";
    var span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + likes + "</span></button><hr>";
    var row = name_with_tag + message_with_tag + likes_with_tag + span_with_tag;
    document.getElementById("output").innerHTML += row; 
    //End code
          } });  }); }
    getData();

    function update_like(message_id)
    {
          console.log("Click on the button" + message_id);
          var button_id = message_id;
          var likes = document.getElementById(button_id).value;
          var updatedLikes = Number(likes) + 1;
          console.log(updatedLikes);

          firebase.database().ref(room_name).child(message_id).update({
                like: updatedLikes
          });
    }
    
    function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
    }
    