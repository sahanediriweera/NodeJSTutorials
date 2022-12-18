const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname,'nkn.txt'),"Hi Good Morning",(err)=>{
    if(err) throw err;
    console.log("Write Complete");
})

fs.appendFile(path.join(__dirname,'newone.txt'),"New Line of text",(err)=>{
    if(err) throw err;
    console.log("Append Complete");
})

fs.writeFile(path.join(__dirname,'anotherone.txt'),"New information",(err)=>{
    if(err) throw err;
    console.log("New file writing");

    fs.appendFile(path.join(__dirname,"anotherone.txt"),"Text for appending",(err)=>{
        if (err) throw err;
        console.log("Append Complete");

        fs.rename(path.join(__dirname,"anotherone.txt"),path.join(__dirname,"newReply.txt"),(err)=>{
            if (err) throw err;
            console.log("Rename Complete");
        })
    })
})


process.on('uncaughtException',err=>{
    console.error('There is an uncaught error'+err);
    process.exit(1);
})