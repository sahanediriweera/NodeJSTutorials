console.log("Helow World NodeJS");
console.log(global);
const os = require('os');
const { extname } = require('path');
const path = require('path');
console.log(os.type());
console.log(os.version());
console.log(os.homedir());
console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(extname(__filename));