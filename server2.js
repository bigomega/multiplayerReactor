var app = require('express').createServer()
var io = require('socket.io').listen(app);

app.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/converse2.html');
});

var usernames = [];
Questions=[{type:2,q:"2+2=4",a:1,qno:0},
{type:2,q:"3/5>1",a:0,qno:1},
{type:2,q:"2-12<4",a:1,qno:2},
{type:2,q:"3*27=71",a:0,qno:3},
{type:1,time:5,qno:4},
{type:1,time:4,qno:5},
{type:1,time:4,qno:6},
{type:1,time:1,qno:7},
{type:1,time:2,qno:8},
{type:1,time:6,qno:9}]
i=0;
ans=[]
s=0;

//que-1 {qno:,type:2,q:,a:}
//que-2 {qno:,type:1,time:}
//ans {time:,qno:}
//res {score:,que:^que-1/2}


// ip finding, but for server
// require('dns').lookup(require('os').hostname(), function (err, add, fam) {
//   console.log('addr: '+add);
// })


    io.sockets.emit('res',{score:0,que:Questions[i]});

io.sockets.on('connection',function(socket){
    s=socket;
    socket.on('ans',function(data){
        console.log(socket)
        console.log(data)
        console.log(i+"\n")
        if(i==data.qno){
            if(Questions[i].type==2){
                if(Questions[i].a==0){
                    score=-1;
                    i++;
                    socket.emit('res',{score:score,que:Questions[i]});
                    socket.broadcast.emit('res',{score:0,que:Questions[i]});
                    return;
                }
                else if(Questions[i].a==1){
                    score=1;
                    i++;
                    socket.emit('res',{score:score,que:Questions[i]});
                    socket.broadcast.emit('res',{score:0,que:Questions[i]}); 
                    return;
                }
            }     
            else if(Questions[i].type==1){
                if(Questions[i].time>=data.time){
                    score=-1;
                    i++;
                    socket.emit('res',{score:score,que:Questions[i]});
                    socket.broadcast.emit('res',{score:0,que:Questions[i]});
                    return;
                }
                else{
                    score=1;
                    i++;
                    socket.emit('res',{score:score,que:Questions[i]});
                    socket.broadcast.emit('res',{score:0,que:Questions[i]}); 
                    return;
                }
            }   
        }
    });
});