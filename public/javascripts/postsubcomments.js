function postSubComments(){

	let username = getCookie('username');
	let postId = extractModule(window.location.toString());

    function extractModule(str)
    {
        let leftBound = str.indexOf("?") + 1;
        let rightBound = str.indexOf("&");
		let id = str.substring(leftBound, rightBound);
		return id;
    }
	
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://us-central1-studentsocial-nuig.cloudfunctions.net/postsubcomments', true);

    xhr.setRequestHeader("Content-type", "application/json");
    //Track the state changes of the request
    xhr.onreadystatechange = function()
    {
        let DONE = 4; //readyState 4 means the request is done
        let OK = 200; // status 200 is a successful return
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                getSubComments();
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    };
    xhr.send(JSON.stringify({"postId": postId, "username":username, "commentText": document.getElementById('commentText').value}
    ));
	
	document.getElementById('commentText').value ="";
}