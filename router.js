var url = require("url");

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

exports.route = route;
