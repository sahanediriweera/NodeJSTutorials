const userDB = {
    users : require('./../model/user.json')
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleLogin = async (req,res) => {
    const {user,psw} = req.body;
    if(!user || !psw){
        return res.status(400).json({
            "message": "User name and password cannot be empty"
        });
    }

    const theuser = userDB.users.find(usr => usr.username === user);
    if(!theuser){
        return res.status(400).json({
            "message":"The data is not found on this"
        });
    }

    const match = await bcrypt.compare(psw,theuser.password);

    if(match){
        res.status(200).json({
            "message":"successfully logged in"
        });
    }else{
        res.status(401);
    }
}

module.exports = {handleLogin};