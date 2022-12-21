const { nextDay } = require('date-fns');
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

app.get('^/$|/index(.html)?',(req,res)=>{
    //res.send("Helow World Text");
    //res.sendFile('./views/index.html',{root: __dirname});
    res.sendFile(path.join(__dirname,"views","index.html"));
})

app.get('/new-page(.html)?',(req,res)=>{
    //res.send("Helow World Text");
    //res.sendFile('./views/index.html',{root: __dirname});
    res.sendFile(path.join(__dirname,"views","new-page.html"));
})
app.get('/old-page(.html)?',(req,res)=>{
    //res.send("Helow World Text");
    //res.sendFile('./views/index.html',{root: __dirname});
    res.redirect(301,"/index.html");
})

app.get('/hello(.html)?',(req,res,next)=>{
    //res.send("Helow World Text");
    //res.sendFile('./views/index.html',{root: __dirname});
    console.log("Holow .html was requested");
    next();
},(req,res)=>{
    res.send('Helow World');
})

const one = (req,res,next) => {
    console.log("First one is done");
    next();
}

const two = (req,res,next)=> {
    console.log("Second one is done");
    next();
}

const three = (req,res)=> {
    console.log("Third one is done");
    res.send("All are done");
}

app.get('/chain(.html)?',[one,two,three]);

app.get('/*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,"views","404.html"));
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));