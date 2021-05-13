var requiredFields = [ "name" , "title", "author", "pages", "publisher", "genre"
]
var myFavBooks = {
  "owner":"Kristine Smbatyan",
  "project": "Book",
  "name":"",
  "title":"",
  "author":"",
  "colour":"",
  "coverType": "",
  "otherCoverValue":"",
  "pages":"",
  "price":"",
  "currency":"",
  "language":"",
  "otherLanguage":"",
  "originalLanguage":"",
  "edition":"",
  "dimensions":"",
  "publisher": "",
  "publishingDate":"",
  "oringinalPublishingDate":"",
  "genre":"",
  "ageRestriction":"",

}
function goToDashboard() {
  location.href = "https://cse120-2021-kristine.herokuapp.com/dashboard.html"
}

function handleFullNameChange(){
    myFavBooks.name = document.getElementById ("fname").value;
}

function titleValue(){
    myFavBooks.title = document.getElementById ("title").value; 
}

function authorValue(){
    myFavBooks.author = document.getElementById ("author").value;
}

function colourValue(){
    myFavBooks.colour = document.getElementById ("colour").value;
}

function pagesValue(){
     myFavBooks.pages = document.getElementById ("pages").value;
}

function priceValue(){
     myFavBooks.price = document.getElementById ("Price").value;
}

function currencyValue(){
     myFavBooks.currency = document.getElementById ("Currency").value;
}

function editionValue(){
     myFavBooks.edition = document.getElementById ("edition").value;
}

function dimensionValue(){
     myFavBooks.dimensions = document.getElementById ("dimensions").value;
}

function publisherValue(){
     myFavBooks.publisher = document.getElementById ("publisher").value;
}

function publishingDateValue(){
     myFavBooks.publishingDate = document.getElementById ("publishing date").value;
}
 
function originalPublishingDateValue(){
     myFavBooks.publishingDate = document.getElementById ("oPDate").value;
}

function genreValue(){
     myFavBooks.genre = document.getElementById ("genre").value;
}

function ageRestrictionValue(){
     myFavBooks.ageRestriction = document.getElementById ("ageRestriction").value;
}
 
function handleCoverValueChange(e) {
  myFavBooks.coverType = e.target.value;
  if (myFavBooks.coverType != "other") {
     myFavBooks.otherCoverValue ="";
     document.getElementById("otherCoverType").style.display="none";
     }else{
    document.getElementById("otherCoverType").style.display="block";
 }
}

function otherTextValue() {
  if (myFavBooks.coverType =="other");
    otherCover = getElementById("otherText").value; 
}

function handleLanguageChange(e){
  myFavBooks.language= e.target.value;
  if (myFavBooks.language != "OtherLang"){
    myFavBooks.otherLanguage="";
    document.getElementById("otherLangText").style.display="none";
  } else{
    document.getElementById("otherLangText").style.display="block";
  }
}
 

function handleOrigLaguageChange(e){
  myFavBooks.originalLanguage = e.target.value;
  if (myFavBooks.language != "OtherLang"){
    myFavBooks.otherLanguage="";
    document.getElementById("otherLangText").style.display="none";
  } else{
    document.getElementById("otherLangText").style.display="block";
  }
}

function otherLangText() {
  if (myFavBooks.language=="otherLang") {
    document.getElementById("otherLangText").value;
  }
}  

function otherOrigLangText(){
  if (myFavBooks.language=="otherOrigLang") {
    document.getElementById("otherOrigLangText").value;
  }
}

function showData(e) {
  e.preventDefault();
    if(validateFormData() == false) {
    return;
  } else {console.log("The current value is", myFavBooks)
    Swal.fire("Good Job!", "Keep Reading!", "success",).then(okay => {
    if (okay) {
       window.location.href = "https://cse120-2021-kristine.herokuapp.com/dashboard.html";
    }
    });
  }

  $.ajax({
    type: 'POST',
    url: "https://cse120-2021-kristine.herokuapp.com/data",
    data: myFavBooks,
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
    var keys = Object.keys(myFavBooks);
    keys.forEach(key => {
        if (requiredFields.indexOf(key) > -1 && myFavBooks[key] == "") { console.log(key, " You forgot to fill in ") 
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
    type: "GET",
    url: "https://cse120-2021-kristine.herokuapp.com/data",
    data: MyFavBooks,
    cache: false,
    dataType: "json",
    success: function (data) {
    console.log("success", data);
    existingData = data;
    displayData(existingData.data);
    },
    error : function (data) {
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

  
