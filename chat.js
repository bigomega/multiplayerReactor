var socket = io.connect("http://localhost");
$(document).ready(function() {
	socket.on("groupChat", function(data) {
		var tmpl = "<p>{{sender}} : {{message}}</p>"
		var html = Mustache.to_html(tmpl, data);
		$("#convo").append(html);
	});
	$("#send").click(function() {
		if($("#message").val()!="") {
			var sendr = $("#user").html();
			var mess = $("#message").val();
			var line = {sender: sendr, message: mess};
			socket.emit("receive", line);
			$("#message").val("");
		}
	});
});
