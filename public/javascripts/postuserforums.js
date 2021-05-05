// POST comments
function postUserForums() {
	let userId = getCookie('docid');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://us-central1-studentsocial-nuig.cloudfunctions.net/postuserforums'+ "?id=" + userId);

    xhr.setRequestHeader("Content-type", "application/json");
    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };
  
    xhr.send(JSON.stringify(
	{"forumTitle": document.getElementById('forumTitle').value, "forumType": document.getElementById("forumType").value}
));
}