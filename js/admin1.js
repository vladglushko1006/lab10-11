
function isOnline() {
	return window.navigator.onLine;
}

function uploadToServer(html)
{
    var http = new XMLHttpRequest();
	var url = "/add_news?html=" + encodeURI(html);
	http.open("POST", url, true);

	http.onreadystatechange = function() {
		if (http.readyState == 4 && http.status == 200) {
			alert(http.responseText);
		}
	}
	
	http.send();
}

function addNews() {
	//indexedDB.deleteDatabase("glush_db");
	
	var Head = document.getElementById('Head').value;
	var Small = document.getElementById('Small').value;
	var Full = document.getElementById('Full').value;
	if (Head == "" || Small == "" || Full == "") {
		alert("Заповніть всі поля!");
		return;
	}
	
	document.getElementById('Head').value = '';
	document.getElementById('Small').value = '';
	document.getElementById('Full').value = '';
	alert('Новина додана');

	var Field = document.getElementById("News");
	
     // Create new elements with attributes
     var responseRow = document.createElement("div");
	 responseRow.setAttribute("class", "novelty");
	 
	 var Name1 = document.createElement("h3");
	 
	 var Date1 = document.createElement("p");
     Date1.setAttribute("class", "blog-post-meta1");
     
	 var Coment1 = document.createElement("p");
	var Coment2 = document.createElement("p");
	 
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
     Name1.innerHTML = Head;
     Coment1.innerHTML = Small;
	 Coment2.innerHTML = Full;
	 Line.innerHTML = Line;

     // Respnse row
     responseRow.appendChild(Name1);
     responseRow.appendChild(Date1);
     responseRow.appendChild(Coment1);
	 responseRow.appendChild(Coment2);
	 responseRow.appendChild(Line);
	 
	 if (isOnline())
	 {
		 uploadToServer(responseRow.innerHTML);
	 }
	 else
	 {
		 if (useLocalStorage)
		 {
			 var items = JSON.parse(localStorage.getItem("addedNews"));
			 items.push(responseRow.innerHTML);
			 localStorage.setItem("addedNews", JSON.stringify(items));
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
				  var transaction = db.transaction("news", "readwrite");
				  var store = transaction.objectStore("news");
				  store.add({ html: responseRow.innerHTML });
			}
		}
	 }
}