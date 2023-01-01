const userDB = {
    users: require('../model/user.json'),
    setUsers: function (data) {this.users = data}
};
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handlerNewUser = async (req,res) => {
    const {user,psw} = req.body;
    if(!user || !psw){
        return res.status(400).json({
            "message":"Username and password are required"
        });
    }

    const duplicate = userDB.users.find(person => person.userName === user);
    if(duplicate) {
        return res.sendStatus(409).json({
            "message":"This user already exists"
        });
    }
    try{
        //encrypt password
        const hashedPsw = await bcrypt.hash(psw,10);
        const newUser = {
            "username":user,
            "password":hashedPsw
        };

        userDB.setUsers([...userDB.users,newUser]);
        await fsPromises.writeFile(path.join(__dirname,"..","model","user.json"),
        JSON.stringify(userDB.users));

        console.log(userDB.users);
        res.status(201).json({
            "message":`New user ${newUser} has been created`
        })

    }catch (err){
        res.status(500).json({
            "message":err.message
        })
    }

}

module.exports = {handlerNewUser};