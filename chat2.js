var socket = io.connect("http://localhost");
question=0
time=0
startQue=function(question){return;}
$(document).ready(function() {
	socket.on("que", function(data) {
		startQue(data);
		$("#convo").append(JSON.stringify(data))
	});
	$("#send").click(function() {
		ans={time:time++}; 
		socket.emit("ans", ans);
	});
});
