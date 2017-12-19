var useLocalStorage = true;

var obj = localStorage.getItem("addedComments");
if (obj == null)
{
	localStorage.setItem("addedComments", JSON.stringify([]));	
}

obj = localStorage.getItem("addedNews");
if (obj == null)
{
	localStorage.setItem("addedNews", JSON.stringify([]));	
}