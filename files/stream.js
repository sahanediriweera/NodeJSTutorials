const fs = require('fs')
const path = require('path')

const rs = fs.createReadStream(path.join(__dirname,"newone.txt"),{encoding:'utf8'});
const ws = fs.createWriteStream(path.join(__dirname,"entirelynew one.txt"));
const ws1 = fs.createWriteStream(path.join(__dirname,"this makes sense.txt"));

rs.on('data',(dataChunk) => {
    ws.write(dataChunk);
})

rs.pipe(ws);

