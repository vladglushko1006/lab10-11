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

httpGetAsync("/get_news", function (res) {
	var obj = JSON.parse(res);
	var Field = document.getElementById("News");
	for (var i = 0; i < obj.length; i++)
	{
		var responseRow = document.createElement("div");
		responseRow.setAttribute("class", "novelty");
		responseRow.innerHTML = obj[i]['html'];
		Field.appendChild(responseRow);
	}
});

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

if (useLocalStorage)
{
	var obj = localStorage.getItem("addedNews");
	if (obj != null && obj != "")
	{
	  var Field = document.getElementById("News");
	  var items = JSON.parse(obj);

	  for (var i = 0; i < items.length; i++)
	  {
		uploadToServer(items[i]);
	 }
		  
	  localStorage.setItem("addedNews", JSON.stringify([]));
	}
	else
	{
	  localStorage.setItem("addedNews", JSON.stringify([]));
	}
}
else
{
	var request_db = indexedDB.open("glush_db");
	var Field = document.getElementById("News");
		
	request_db.onupgradeneeded = function()
	{
		var db = request_db.result;
		db.createObjectStore("news", {keyPath: 'html'});
		db.createObjectStore("reviews", {keyPath: 'html'});
	}
			
	request_db.onsuccess = function()
	{
		var os = request_db.result.transaction("news", "readwrite").objectStore("news");
		var request = os.openCursor();
		request.onsuccess = function(event)
		{
			var cursor = event.target.result;
				
			if (cursor)
			{
				var html = cursor.value.html;
				uploadToServer(html);
				
				cursor.continue();
			}
		}
			
		request.oncomplete = function()
		{
			indexedDB.deleteDatabase("glush_db");
		}
	};
}