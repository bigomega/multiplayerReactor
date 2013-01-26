var http = require("http");
var url = require("url");
var io = require("socket.io");


function start(route, handle) {
    function onRequest(request, response) {
        var pathname  = url.parse(request.url).pathname;
        var getData = "";

        console.log("Request received for " + pathname);
        
        if(url.parse(request.url).query != null)
            {
                getData = url.parse(request.url).query;
                console.log(getData);
            }
        
            request.setEncoding("utf-8");
            route(handle, pathname, response, getData);
    }

    var app = http.createServer(onRequest).listen(23103);
    console.log("Server has started");

    io = io.listen(app);

    io.sockets.on("connection", function(socket) {
        console.log("Connection established");
        socket.on("receive", function(data) {
            console.log("this is received: " + data);
            io.sockets.emit("groupChat", data);
        });
    });
}

exports.start = start;
