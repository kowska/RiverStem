var ws = new WebSocket("ws://localhost:8080/ws");

var clients = []
var self_id;
var name;

ws.onmessage = function(e) {

	console.log(JSON.parse(e.data))

	msg = (JSON.parse(e.data).message)
	sender = (JSON.parse(e.data).user)

	if(msg == '' || msg.trim().length == 0) return;

	if ((JSON.parse(e.data).user) == self_id) {
		$("#chat-scroll").append("<div class='messages self-message'>"  + msg + "</div>");
	}
	else {
		$("#chat-scroll").append(  "<div class='messages other-message'>" + "<b> "+ sender +": </b>" +   msg + "</div>");
	}

	
	$("#chat-scroll").scrollTop($("#chat-scroll")[0].scrollHeight );
}


ws.onopen = function(e){
	self_id = Math.floor(Math.random() * 1000000).toString();
	name = self_id;
	document.getElementById("current-name").innerHTML = name;	
}
 	

function sendText() {

	text = document.getElementById("text-box").value 

	if (text == '' || text.trim().length == 0) return;

	var msg = {
		message: document.getElementById("text-box").value,
		user:  self_id,
		date: Date.now()
	};

	ws.send(JSON.stringify(msg));
	document.getElementById("text-box").value = "";
}


function ChangeSelfID() {

	new_name = document.getElementById("name-box").value 

	if (new_name == '' || new_name.trim().length == 0) return;

	self_id = new_name;
	document.getElementById("current-name").innerHTML = self_id;	
	document.getElementById("name-box").value = "";	

}