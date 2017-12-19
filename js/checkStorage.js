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

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

httpGetAsync("/get_reviews", function (res) {
	var obj = JSON.parse(res);
	var Field = document.getElementById("Field");
	for (var i = 0; i < obj.length; i++)
	{
		var responseRow = document.createElement("div");
		responseRow.setAttribute("class", "feedback");
		responseRow.innerHTML = obj[i]['html'];
		Field.appendChild(responseRow);
	}
});

function onOnline()
{
	if (useLocalStorage)
	{
		var obj = localStorage.getItem("addedComments");
		if (obj != null && obj != "")
		{
		  var Field = document.getElementById("Field");
		  var items = JSON.parse(obj);

		  for (var i = 0; i < items.length; i++)
		  {
			var responseRow = document.createElement("div");
			responseRow.setAttribute("class", "feedback");
			responseRow.innerHTML = items[i];
			Field.appendChild(responseRow);
			uploadToServer(items[i]);
		  }
		  
		  localStorage.setItem("addedComments", JSON.stringify([]));
		}
		else
		{
		  localStorage.setItem("addedComments", JSON.stringify([]));
		}
	}
	else
	{
		var request_db = indexedDB.open("glush_db");
		var Field = document.getElementById("Field");
		
		request_db.onupgradeneeded = function()
		{
			var db = request_db.result;
			db.createObjectStore("news", {keyPath: 'html'});
			db.createObjectStore("reviews", {keyPath: 'html'});
		}
			
		request_db.onsuccess = function()
		{
			var os = request_db.result.transaction("reviews", "readwrite").objectStore("reviews");
			var request = os.openCursor();
			request.onsuccess = function(event)
			{
				var cursor = event.target.result;
				
				if (cursor)
				{
					var html = cursor.value.html;
					uploadToServer(html);
					var responseRow = document.createElement("div");
					responseRow.setAttribute("class", "feedback");
					responseRow.innerHTML = html;
					Field.appendChild(responseRow);
					
					cursor.continue();
				}
			}
			
			request.oncomplete = function()
			{
				indexedDB.deleteDatabase("glush_db");
			}
		};
	}
}

window.addEventListener('online', onOnline);