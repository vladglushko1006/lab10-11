function uploadToServer()
{
    alert("The data has been uploaded to the server!");
}

function addNews(){

     var TitleText = document.getElementById("Head");
	 if(TitleText.value == ""){
        alert("Ваш коментар не несе змісту. Спробуйте інший");
        return;
    }

    var SmallText = document.getElementById("Small");
     if(SmallText.value == ""){
        alert("Ваш коментар не несе змісту. Спробуйте інший");
        return;
    }
	 
	 
     var FullText = document.getElementById("Full");
	 if(FullText.value == ""){
        alert("Ваш коментар не несе змісту. Спробуйте інший");
        return;
    }
	 
     var ShortText = document.getElementById("Small");
     if(TitleText.value != "" && FullText != "" && ShortText!=""){
         alert("Дякую за додану новину)");
     }
	 
	 // datetime column
     var dateString = "";
     dateString = date.getDate() + "." + (date.getMonth()+1) + "." + (date.getYear() + 1900) + ", " + date.getHours() + ":" + date.getMinutes();
 
     //content
     Date1.innerHTML = dateString;
     TitleText1.innerHTML = TitleText.value;
     SmallText1.innerHTML = SmallText.value;
	 FullText1.innerHTML = FullText.value;

     // Respnse row
     responseRow.appendChild(TitleText1);
     responseRow.appendChild(Date1);
     responseRow.appendChild(SmallText1);
	 responseRow.appendChild(FullText1);


	  // Clean fields
     TitleText.value = "";
     SmallText.value = "";
	 FullText.value = "";
	 
	 Field.appendChild(responseRow)
	 
 } 


