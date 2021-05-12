var requiredFields = [ "fullName" , "startDate", "fallInLove", "firstTeacher"
]
var myFavHobby = {
"project" : "Chess",
"owner" : "Kristine Smbatyan",
"fullName":"",
"startDate": "",
"fallInLove": "",
"firstTeacher": "",
"playingYearLenght":"",
"beautifulTrait":"",
"favPlayer":"",
"playingStyle":"",
"FIDErating":""
}

function handleFullNameChange(){
   myFavHobby.fullName = document.getElementById ("name").value;
   if(myFavHobby.fullName ==""){
       document.getElementById("name").style.backgroundColor="#B6271B";
      }else {
    document.getElementById("name").style.backgroundColor="white"
      }
}

function handleStartDateChange(){
  myFavHobby.startDate = document.getElementById ("Q1").value;
  if(myFavHobby.startDate ==""){
     document.getElementById("Q1").style.backgroundColor="#B6271B";
     }else {
    document.getElementById("Q1").style.backgroundColor="white"
  }
}

function handleFallInLoveChange(){
  myFavHobby.fallInLove = document.getElementById ("Q1'").value;
  if(myFavHobby.fullName ==""){
     document.getElementById("Q1'").style.backgroundColor="#B6271B";
    }else {
     document.getElementById("Q1'").style.backgroundColor="white"
  }
}

function handleFirstTeacherChange(){
  myFavHobby.firstTeacher = document.getElementById ("Q2").value;
  if(myFavHobby.fullName ==""){
     document.getElementById("Q2").style.backgroundColor="#B6271B";
     }else {
     document.getElementById("Q2").style.backgroundColor="white"
  }
}

function handlePlayingYearsChange(e){
    myFavHobby.playingYearLenght = e.target.value;
}

function handleBeautifulThingChange(){
    myFavHobby.beautifulTrait = document.getElementById ("Q4").value;
}

function handleFavPlayerChange(){
    myFavHobby.favPlayer = document.getElementById ("Q5").value;
}

function handlePlayingStyleChange(e){
  var value = e.target.value;
  if (e.target.checked == true) {
    myFavHobby.playingStyle = myFavHobby.playingStyle + "," + value;
  } else {
    myFavHobby.playingStyle = ""
  }
}

function handleRatingChange() {
    myFavHobby.FIDErating = document.getElementById("Q7").value;
    document.getElementById("ratingOutput").innerHTML = myFavHobby.FIDErating;
}

function myFavHobbyData(e) {
  e.preventDefault();
  if(validateFormData() == false) {
    return;
  } else {console.log("The current value is", myFavHobby)
  window.location.href = "https://cse120-2021-kristine.herokuapp.com/index.html"

  }

  $.ajax({
    type: 'POST',
    url: "https://cse120-2021-kristine.herokuapp.com/data",
    data: myFavHobby,
    cache: false,
    dataType : 'json',
    success: function (data) {
    console.log("success");
    },
    error: function (xhr) {
    console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");  
    }
  });
}

function validateFormData() {
    var isFormValid = true;
    var keys = Object.keys(myFavHobby);
    keys.forEach(key => {
        if (requiredFields.indexOf(key) > -1 && myFavHobby[key] == "") { console.log(key, " is a required field, please add a value") 
        if(document.getElementById(key)) {
          document.getElementById(key).style.backgroundColor = "red"; 
          isFormValid = false;
        }
      }   
    })
    return isFormValid;
}

function loadExistingData() {
	var existingData = [];
  $.ajax({
    type : "GET",
    url : "https://cse120-2021-kristine.herokuapp.com/data",
    dataType : "json",
    data : MyFavHobby ,
    cache : false ,
    success : function(data) {
    console.log("success", data);
    existingData = data;
    displayData(existingData.data);
    },
    error : function(data) {
        console.log("Error")
    }
  });
}

function displayData(existingData) {
    document.getElementById("existingData").innerHTML = "<ul>";
    for (var i = 0; i < existingData.length; i++) {
      currentBook = existingData[i];
      document.getElementById("existingData").innerHTML += "<li><i>" + currentBook.fullname + "</li> : <b>" + currentBook.title + "</b></li>";
    }
    document.getElementById("existingData").innerHTML += "</ul>" 
}
