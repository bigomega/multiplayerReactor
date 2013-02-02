var app = require('express').createServer()
var io = require('socket.io').listen(app);
var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

app.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


handle={};
handle["/"] = Gstart;
handle["/js"] = js;
handle["/css"] = css;
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

function route(handle, pathname, response, getData) {
    console.log("About to route a request for " + pathname);
    if(typeof(handle[pathname]) === "function")
        handle[pathname](response, getData);
    else if(pathname.indexOf(".js")!=-1)
        handle['/js'](response, pathname);
    else if(pathname.indexOf(".css")!=-1)
        handle['/css'](response, pathname);
    else if(pathname.indexOf(".tpl")!=-1)
        handle['/tpl'](response, pathname);
    else { 
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404\nPage Not Found");
        response.end();
    }
}

function js(response, fileName) {    
    response.writeHead(200, {"Content-Type": "text/javascript"});
    fileName = "." + fileName;
    response.write(fs.readFileSync(fileName));
    response.end();
}

function css(response, fileName) {
    response.writeHead(200, {"Content-Type": "text/css"});
    fileName = "." + fileName;
    response.write(fs.readFileSync(fileName));
    response.end();
}

function Gstart(response, fileName){
    console.log("start")
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(fs.readFileSync("./converse2.html"));
}

var usernames = [];
Questions=[{type:2,q:"2+2=4",a:1,qno:0},
{type:2,q:"3/5>1",a:0,qno:1},
{type:2,q:"2-12<4",a:1,qno:2},
{type:2,q:"3*27=71",a:0,qno:3},
{type:1,time:2,qno:4},
{type:1,time:1.45,qno:5},
{type:1,time:3.8,qno:6},
{type:1,time:2.5,qno:7},
{type:1,time:0.8,qno:8},
{type:1,time:5,qno:9}]
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

playerCount=0;


io.sockets.on('connection',function(socket){
    s=socket;
    playerCount++;
    if(playerCount<2)
        io.sockets.emit('res',{info:"Waiting for another user to Connect"});
    else
        io.sockets.emit('res',{score:0,que:Questions[i]});

    socket.on('ans',function(data){
        console.log(data)
        console.log(i+"\n")
        if(i==data.qno){
            if(Questions[i].type==2){
                if(Questions[i].a==0){
                    score=-1;
                    i++;
                }
                else if(Questions[i].a==1){
                    score=1;
                    i++;
                }
            }     
            else if(Questions[i].type==1){
                if(Questions[i].time>=data.time){
                    score=-1;
                    i++;
                }
                else{
                    score=1;
                    i++; 
                }
            }  
            socket.emit('res',{score:score,que:Questions[i]});
            socket.broadcast.emit('res',{score:0,hitter:{name:'px',score:score},que:Questions[i]}); 
            return;
        }
    });

    socket.on("disconnect",function(){
        playerCount--;
    });
});