var loadedData = [];

function loadBookEditItem() {
    localStorage = window.localStorage;
    editItem = JSON.parse(localStorage.getItem("editItem"));
    console.log(editItem);
    document.getElementById("_id").innerHTML = editItem["_id"];
    document.getElementById("title").value = editItem["title"];
    document.getElementById("name").value = editItem["fullName"];   
    document.getElementById("author").value = editItem["author"];   
    document.getElementById("pages").value = editItem["pages"];
    document.getElementById("colour").value = editItem["colour"];
    document.getElementById("CoverType").value = editItem["CoverType"];
    document.getElementById("Price").value = editItem["Price"];
    document.getElementById("Currency").value = editItem["Currency"];
    
}

function editData(id) {
    var tmp = id.split("edit_");
    var item_id = tmp[1];

    loadedData.forEach(item => {
        if (item._id == item_id) {
            console.log(item); 
            localStorage = window.localStorage;
            localStorage.setItem('editItem', JSON.stringify(item));
            document.location  = "edit_book.html"; 
        }
    })
}

function loadHobbyEditItem() {
    localStorage = window.localStorage;
    editItem = JSON.parse(localStorage.getItem("editItem"));
    console.log(editItem);
    document.getElementById("_id").innerHTML = editItem["_id"];
    document.getElementById("name").value = editItem["fullName"];
    document.getElementById("Q1").value = editItem["startDate"];   
    document.getElementById("Q1'").value = editItem["fallInLove"];   
    document.getElementById("Q2").value = editItem["firstTeacher"];
    document.getElementById("Q3.1").value = editItem["playingYearLenght"];
    document.getElementById("Q4").value = editItem["beautifulTrait"];
    document.getElementById("Q5").value = editItem["favPlayer"];
    document.getElementById("Q6").value = editItem["playingStyle"];
    document.getElementById("Q7").value = editItem["FIDErating"];
}

function editData(id) {
    var tmp = id.split("edit_");
    var item_id = tmp[1];

    loadedData.forEach(item => {
        if (item._id == item_id) {
            console.log(item); 
            localStorage = window.localStorage;
            localStorage.setItem('editItem', JSON.stringify(item));
            if (item.project == "Chess") {
              document.location  = "edit_hobby.html";
            } else {
              document.location  = "edit_book.html";
            
        }
     }
})
}

 function deleteData(id) {

    var r = confirm("Are you sure you want to delete the item with the following ID? " + id);
    if (r == false) {
        return;
    }

    var tmp = {
        "id": id
    }

    $.ajax({
        type: 'POST',
        url: "https://cse120-2021-kristine.herokuapp.com/data/delete",
        data: tmp,
        cache: false,
        dataType : 'json',
        success: function (data) {
            console.log("success");
            document.getElementById("div" + id).style.display = "none";
        },
        error: function (xhr) {
            console.error("Error in post", xhr);
        },
        complete: function () {
            console.log("Complete");  
        }
    });
}

 function saveData() {
	var tmp = {
		"test": "Data"
	}

    $.ajax({
        type: 'POST',
        url: "https://cse120-2021-kristine.herokuapp.com/data",
        data: tmp,
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

function loadExistingData() {
  myHobbyData = [];
  myBookData = [];
  otherData = [];
  $.ajax({
      type : "GET",
      url : "https://cse120-2021-kristine.herokuapp.com/data",
      dataType : "json",
      success : function(data) {
        console.log("success", data);
        loadedData = data.data;
        data.data.forEach(elem => {
          if (elem["owner"] == "Kristine Smbatyan") {
            if (elem["project"] == "Chess") {
              myHobbyData.push(elem);
            } else {
              myBookData.push(elem);
            }
          } else {
            otherData.push(elem);
          }
        })
        displayData(myHobbyData, "chessDataContainer");
        displayData(myBookData, "bookDataContainer");
        displayData(otherData, "otherDataContainer");
      },
      error : function(data) {
          console.log("Error")
      }
  });
}

function displayData(data, containerDivName) {
    
    document.getElementById(containerDivName).innerHTML = "";
    data.forEach(elem => {
            var item = document.createElement("div");
	    item.id = "div" + elem["_id"];
	    item.className = "item";
	    if (Object.keys(elem).length == 1) {
            var span = document.createElement("span");
            span.innerHTML = "<i>Empty Element with autogenerated ID: </i>" + elem["_id"];
            item.appendChild(span);
        }
        Object.keys(elem).forEach(key => {
            if (key != "_id") {
                var span = document.createElement("span");

                var b = document.createElement("b");
                b.innerHTML = key + ": ";
                span.appendChild(b);
                
                span.className = "item";
                if (elem[key]) {
                    span.innerHTML += elem[key];
                } else {
                    var span1 = document.createElement("span");
                    span1.className = "undefined";
                    span1.innerHTML = "N/A";
                    span.appendChild(span1)
                }
                item.appendChild(span);

                var br = document.createElement("br");
                item.appendChild(br);
            }
        })
        var edit_button = document.createElement("button");
        edit_button.innerHTML = "Edit";
        edit_button.id = "edit_" + elem["_id"];
        edit_button.className = "edit";
        edit_button.addEventListener("click", function(e){
            editData(e.target.id);
        }, false);
        item.appendChild(edit_button);

        var button = document.createElement("button");
        button.innerHTML = "Delete";
        button.id = elem["_id"];
        button.addEventListener("click", function(e){
            deleteData(e.target.id);
        }, false);
        item.appendChild(button);
        document.getElementById(containerDivName).appendChild(item);
    })

    document.querySelectorAll("#chessDataContainer div.item").forEach(div => {
          div.addEventListener("click", function(e){
          if (this.style.height == "auto") {
          this.style.height = "30px";
        } else {
          this.style.height = "auto";
        }
      })        
    })

}
    document.querySelectorAll("#bookDataContainer div.item").forEach(div => {
          div.addEventListener("click", function(e){
          if (this.style.height == "auto") {
          this.style.height = "30px";
        } else {
          this.style.height = "auto";
        }
      })        
    })


 
 function updateHobbyDataChanges(e) {
  e.preventDefault();
  var updatedHobby = {};
  updatedHobby.id = document.getElementById("_id").value;
  updatedHobby.name = document.getElementById("name").value;
  updatedHobby.Q1= document.getElementById("Q1").value;

  updatedHobby.Q2 = document.getElementById("Q2").value;
 
  updatedHobby.Q4 = document.getElementById("Q4").value;
  updatedHobby.Q5 = document.getElementById("Q5").value;
  updatedHobby.Q6 = document.getElementById("Q6").value;
  updatedHobby.Q7 = document.getElementById("Q7").value;
 
function updateBookDataChenges(e) {
  e.preventDefault();
  var updatedBook = {};
  updatedBook.id = document.getElementById("_id").value;
  updatedBook.fullname = document.getElementById("fullNameForm").value;
  updatedBook.title = document.getElementById("titleFrom").value;
  updatedBook.author = document.getElementById("authorForm").value;
  updatedBook.colour = document.getElementById("colourForm").value;
  updatedBook.cover = document.getElementById("coverFoorm").value;
  updatedBook.pages = document.getElementById("pages").value;
  updatedBook.price = document.getElementById("price").value;
  updatedBook.currency = document.getElementById("currency").value;
  updatedBook.language = document.getElementById("language").value;
  updatedBook.olanguage = document.getElementById("olanguage").value;
  updatedBook.edition = document.getElementById("edition").value;
  updatedBook.dimensions = document.getElementById("dimensions").value;
  updatedBook.publisher = document.getElementById("publisher").value;
  updatedBook.publishingDate = document.getElementById("publishingDate").value;
  updatedBook.oPublishingDate = document.getElementById("oPublishingDate").value;
  updatedBook.genre = document.getElementById("genre").value;
  updatedBook.ageRestriction = document.getElementById("ageRestriction").value;



      $.ajax({
      type: 'POST',
      url: "https://cse120-2021-kristine.herokuapp.com/data",
      data: updatedBook,
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

