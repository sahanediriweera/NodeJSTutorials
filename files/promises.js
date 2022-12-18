const fsPromises = require('fs').promises;
const path = require('path');


const fileOps = async () => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname,"newone.txt"),'utf8');
        console.log(data);
        await fsPromises.writeFile(path.join(__dirname,"newone.txt"),"This is some text");
        console.log("Writing Complete");
        await fsPromises.appendFile(path.join(__dirname,"newone.txt"),"This is the new appendation");
        console.log("The appendation of the text");
        await fsPromises.rename(path.join(__dirname,"starter.txt"),path.join(__dirname,"This is the new format.txt"));
        console.log("Renaming complete");
    }catch (err){
        console.error(err);
    }
}

fileOps();
