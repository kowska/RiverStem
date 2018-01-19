var ws = new WebSocket("ws://localhost:8080/ws");

function sendText() {

  var msg = {
    message: document.getElementById("text-box").value,
    user:   1,
    date: Date.now()
  };

  ws.send(JSON.stringify(msg));

  document.getElementById("text-box").value = "";
}

ws.onmessage = function(e) {
	
	msg = (JSON.parse(e.data).message)
	document.getElementById("messages").innerHTML  += msg + '<br>';
}