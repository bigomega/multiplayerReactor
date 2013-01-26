var app = require('express').createServer()
var io = require('socket.io').listen(app);

app.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/converse2.html');
});

var usernames = {};
Questions=[{type:2,q="2+2=4",a=1},{type:2,q="3/5>1",a=0},{type:2,q="2-12<4",a=1},{type:2,q="3*27=71",a=0},{type:1,time:5},{type:1,time:4},{type:1,time:4},{type:1,time:1},{type:1,time:2},{type:1,time:6},]
i=0;

io.sockets.emit('que',Questions[i++]);

io.sockets.on('connection',function(socket){



    socket.on('ans',function(data){
        console.log('got ans');
        if(i<Questions.length) setTimeout(function(){io.sockets.emit('que',Questions[i++])},2000);        
    });

        // socket.on('adduser', function(username){
        //     // we store the username in the socket session for this client
        //     socket.username = username;
        //     // add the client's username to the global list
        //     usernames[username] = username;
        // });
});