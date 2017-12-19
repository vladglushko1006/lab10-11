/*window.addEventListener('load', function() {
    function updateOnlineStatus(event) {
        if (isOnline()) {
            readOfflineNews();
        }
    }
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});
*/
function isOnline() {
    return window.navigator.onLine;
}

function readOfflineNews() {
    if (useLocalStorage) {
    len = localStorage.length + 1;
		for (var k = 1; k < len; k++) {
			news = JSON.parse(localStorage.getItem('news' + k));
			var parentElem = document.getElementById('news-list');
			var out = document.createElement('div');
			out.id = 'news';
			out.innerHTML = "<div class= novelty>" + 
                        "<h3>" + news[0].Head + "</h3>" +
                        "<p>" + news[0].Small + "</p>" + 
						"<p>" + news[0].Full + "</p>" + 
                        "</div>";
			parentElem.appendChild(out);
	}
    localStorage.delete("list", JSON.stringify([]))
	}
	
	else {
        var transaction = db.transaction(["news"], "readonly");
        var store = transaction.objectStore("news");
        store.openCursor().onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                cursor.continue();
                    var parentElem = document.getElementById('news-list');
                    var out = document.createElement('div');
                    out.id = 'news';
                    out.innerHTML = "<div class= novelty>" + 
                                    "<h3>" + cursor.value.name + "</h3>" +
                                    "<p>" + cursor.value.Small + "</p>" + 
									"<p>" + cursor.value.Full + "</p>" + 
									"<p>" + cursor.value.Full + "</p>" + 
                                    "</div>";
                    parentElem.appendChild(out);
						}
		}
	}
}