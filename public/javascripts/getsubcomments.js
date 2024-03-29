function getSubComments(id)
{
	
	let postId = extractModule(window.location.toString());

    function extractModule(str)
    {
        let leftBound = str.indexOf("?") + 1;
        let rightBound = str.indexOf("&");
		let id = str.substring(leftBound, rightBound);
		return id;
    }
	
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://us-central1-studentsocial-nuig.cloudfunctions.net/getsubcomments');

    //Track the state changes of the request
    xhr.onreadystatechange = function()
    {
        console.log("started");
        let DONE = 4; //readyState 4 means the request is done
        let OK = 200; // status 200 is a successful return
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                let sHTML = "";
                let data = JSON.parse(xhr.responseText);
                for (let i = 0; i < data.length; i++) {
                    if(data[i].postId === postId){
						sHTML += "<div class='textBubble' id='textBubble'>";
						sHTML += "<p>"+data[i].username+": " + data[i].commentText+ "</p></div>";
                }}
				document.getElementById("comments").innerHTML = sHTML;
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    }
    xhr.send(null);
	
	// Invokes getSubComments every minute
	setInterval(getSubComments, 60000);
}