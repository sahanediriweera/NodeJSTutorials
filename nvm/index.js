const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
const { join } = require('path');
class Emitter extends EventEmitter {};
const myEmitter = new Emitter();
myEmitter.on('log',(msg) => logEvents.logEvents(msg));
const PORT = process.env.PORT || 3500;

const serverFile = async (filePath,ContentType,response) => {
    try{
        const rawData = await fsPromises.readFile(filePath,'utf8');
        const data = ContentType === 'application/json'
            ? JSON.parse(rawData):rawData;
        response.writeHead(
            filePath.includes("404.html")? 404 : 200
            ,{"Content-Type": ContentType});
        response.end(
            ContentType === 'application/json'
            ? JSON.stringify(data): data
        );
    }catch (err){
        console.error(err);
        myEmitter.emit('log',`${err.name}\t${err.message}`,"errorData.txt");
    }
}

const server = http.createServer((req,res) => {
    console.log(req.url,req.method);
    myEmitter.emit('log',`${req.url}\t${req.method}`,"logData.txt");
    let filepath;

    const extentionname = path.extname(req.url);
    let contenttype;

    switch(extentionname){
        case '.css':
            contenttype = 'text/css';
            break;
        case '.js':
            contenttype = 'text/javascript';
            break;
        case '.json':
            contenttype = 'application/json';
            break;
        case '.jpg':
            contenttype = 'image/jpeg';
            break; 
        case '.png':
            contenttype = 'image/png';
            break;
        case '.css':
            contenttype = 'text/plain'
            break;
        default:
            contenttype = 'text/html';           
    }

    filepath = 
        contenttype === 'text/html' && req.url === '/'
            ? path.join(__dirname,"views","index.html")
            : contenttype = 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname,"views",req.url,"index.html")
                : contenttype === 'text/html'
                    ? path.join(__dirname,"views",req.url)
                    : path.join(__dirname,req.url);

    if(!extentionname && req.url.slice(-1) !== '/') filepath += '.html';

    const fileExist = fs.existsSync(filepath);

    if(fileExist){
        // serve
        serverFile(filepath,contenttype,res);
    }else{
        //404
        //301 redirect
        console.log(path.parse(filepath));

        switch(path.parse(filepath).base){
            case 'old-page.html':
                res.writeHead(301,{'Location':'/new-page.html'});
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301,{"Location":"/"});
                res.end();
                break;
            default:
                serverFile(path.join(__dirname,"views","404.html"),'text/html',res);
                
        }
    }

    // switch(req.url){
    //     case '/':
    //         res.statusCode = 200;
    //         res.setHeader('Content-Type','text/html');
    //         fs.readFile(path.join(__dirname,"views","index.html"),'utf8',(err,data)=>{
    //             if (err) throw err;
    //             console.log(data);
    //             res.end(data);
    //         });
    //         break;
    // }


    // if(req.url === '/' || req.url === 'index.html'){
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type','text/html');
    //     filepath = path.join(__dirname,"views","index.html");
    //     fs.readFile(filepath,'utf8',(err,data)=>{
    //         if(err) throw err;
    //         console.log(data);
    //         res.end(data);
    //     });
    // }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// //add listerner for the log event
// myEmitter.on('log',(msg) => logEvents.logEvents(msg));
// console.log("At least it came to here");
// setTimeout(() => {
//     myEmitter.emit('log','Log Event Started');
// },2000);