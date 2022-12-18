const fs = require('fs');
const path = require('path');

// fs.mkdir(path.join(__dirname,"Newly newly"),(err) => {
//     if (err) throw err;
//     console.log("New directory created");
// })

if(!fs.existsSync(path.join(__dirname,"Newly newly"))){
    fs.mkdir(path.join(__dirname,"Newly newly"),(err) => {
        if (err) throw err;
        console.log("Directory Created");
    }) 
}else{
    console.log("Directory already exisits");

    fs.rmdir(path.join(__dirname,"Newly newly"),(err)=>{
        if (err) throw err;
        console.log("Directory Deleted");
    })
}