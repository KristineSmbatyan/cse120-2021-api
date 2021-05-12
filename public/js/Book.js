var myFavBooks= {
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
     myFavBooks.pages = document.getElementById ("Pages").value;
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
     myFavBooks.ageRestriction = document.getElementById ("AR").value;
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

function handleLanguageChange(event){
    myFavBooks.language= event.target.value;
    if (myFavBooks.language != "OtherLang"){
    myFavBooks.otherLanguage="";
    document.getElementById("otherLangText").style.display="none";
  } else{
    document.getElementById("otherLangText").style.display="block";
  }
}
 

function handleOrigLaguageChange(event){
  myFavBooks.language= event.target.value;
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

  function loadExistingData() {
  var existingData = [];
  $.ajax({
    type: "GET",
    url: "https://cse120-2021-api-maria.herokuapp.com/data",
    data: MyFavBooks,
    cache: false,
    dataType: "json",
    success: function (data) {
      console.log("success", data);
      existingData = data;
      displayData(existingData.data);
    },
    error: function (data) {
      console.log("Error")
    }
  });
}

  
