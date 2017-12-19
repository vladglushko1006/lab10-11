function isOnline()  
{
	return  window.navigator.onLine; 
}

function uploadToServer(html)
{
    var http = new XMLHttpRequest();
	var url = "/add_review?html=" + encodeURI(html);
	http.open("POST", url, true);

	http.onreadystatechange = function() {
		if (http.readyState == 4 && http.status == 200) {
			alert(http.responseText);
		}
	}
	
	http.send();
}

function AddComment(){
 
 var Name = document.getElementById("Name");
    if(Name.value == ""){
        alert("Відкрийте своє ім'я перед системою");
		return;
    }
  

 var Check = document.getElementById("Check");
    if(Check.value == ""){
        alert("Ваш коментар не несе змісту. Спробуйте інший");
        return;
    }
   
    var Field = document.getElementById("Field");
	
 
     // Create new elements with attributes
     var responseRow = document.createElement("div");
	 responseRow.setAttribute("class", "feedback");
	 
	 var Name1 = document.createElement("h3");
	 
	 var Date1 = document.createElement("p");
     Date1.setAttribute("class", "blog-post-meta1");
     
	 var Coment = document.createElement("p");
	 
	 var Line = document.createElement("hr");
	 Line.setAttribute("align", "center");
	  Line.setAttribute("width", "500");
	  Line.setAttribute("size", "2");
 	  Line.setAttribute("color", "#ff0000");
	  
     // datetime column

     var date = new Date();
     var dateString = "";
     dateString = date.getDate() + "." + (date.getMonth()+1) + "." + (date.getYear() + 1900) + ", " + date.getHours() + ":" + date.getMinutes();
 
     //content
     Date1.innerHTML = dateString;
     Name1.innerHTML = Name.value;
     Coment.innerHTML = Check.value;
	 Line.innerHTML = Line.value;

     // Respnse row
     responseRow.appendChild(Name1);
     responseRow.appendChild(Date1);
     responseRow.appendChild(Coment);
	 responseRow.appendChild(Line);
	 
    // insert to doc
    if (isOnline())
    {
        Field.appendChild(responseRow);
        uploadToServer(responseRow.innerHTML);
    }
    else
    {
		if (useLocalStorage)
		{
			var items = JSON.parse(localStorage.getItem("addedComments"));
			items.push(responseRow.innerHTML);
			localStorage.setItem("addedComments", JSON.stringify(items));
		}
		else {
			var request = indexedDB.open("glush_db");
		
			request.onupgradeneeded = function()
			{
				var db = request.result;
				db.createObjectStore("news", {keyPath: 'html'});
				db.createObjectStore("reviews", {keyPath: 'html'});
			}
		
			request.onsuccess = function(event)
			{
				  var db = event.target.result;
				  var transaction = db.transaction("reviews", "readwrite");
				  var store = transaction.objectStore("reviews");
				  store.add({ html: responseRow.innerHTML });
			}
		}
    }
 
     // Clean fields
     Name.value = "";
     Check.value = "";
 }