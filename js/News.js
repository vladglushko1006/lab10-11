function isOnline()  
{
	return  window.navigator.onLine; 
}

function AddNews(){
 
     // Create new elements with attributes
     var responseRow = document.createElement("div");
	 responseRow.setAttribute("class", "novelty");
	 
	 var TitleText = document.createElement("h3");
	 
	 var Date1 = document.createElement("p");
     Date1.setAttribute("class", "blog-post-meta1");
     
	 var SmallText = document.createElement("p");
	 
	 var FullText = document.createElement("p")
	 
	 var Line = document.createElement("hr");
	 Line.setAttribute("align", "center");
	  Line.setAttribute("width", "500");
	  Line.setAttribute("size", "2");
 	  Line.setAttribute("color", "#ff0000");
	  

     // datetime column

     var date = new Date();

	 if (isOnline())
    {
        Field.appendChild(responseRow);
        uploadToServer();
    }
    else
    {
        var items = JSON.parse(localStorage.getItem("addedComments"));
        items.push(responseRow.innerHTML);
        localStorage.setItem("addedComments", JSON.stringify(items));
    }

}