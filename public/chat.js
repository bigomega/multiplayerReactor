$(document).ready(function(){
	var tmpl = "<p>{{sender}}: {{message}} </p>";
		$("#send").click(function() {
			if($("#message").val() != "")
			{
				$.ajax({
				type: "GET",
				url: "/talk?sender=" + $("#user").html() + "&message=" + $("#message").val()
			}).done(function(data) {
				var messData = JSON.parse(data);
				var html = Mustache.to_html(tmpl, messData);
				$("#convo").append(html);
			});
			$("#message").val("");
		}
	})
});