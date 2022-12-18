const fs = require('fs');

fs.readFile('./starter.txt',(err,data)=>{
    if (err) throw err;
    console.log(data);
})

fs.readFile('./starter.txt',(err,data)=>{
    if (err) throw err;
    console.log(data.toString());
})

fs.readFile('./starter.txt','utf8',(err,data)=>{
    if (err) throw err;
    console.log(data);
})

// fs.readFile('./nkn.txt','utf8',(err,data)=>{
//     if (err) throw err;
//     console.log(data);
// })

const path = require('path');

fs.readFile(path.join(__dirname,'files','staarter.txt'),'utf8',(err,data)=>{
    if(err) throw err;
    console.log(data);
})

process.on('uncaughtException', err =>{
    console.error('There is an uncaught error '+{err});
    process.exit(1);
})