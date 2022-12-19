const {format} = require('date-fns');
const {v4:uuid} = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message) =>{
    const values = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const dataTime = `${values}`;
    const logItem = `${dataTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);

    try{
        await fsPromises.appendFile(path.join(__dirname,"eventLog.txt"),logItem);
    }catch (err){
        console.error(err);
    }
}

module.exports = {logEvents};