const userDB = {
    users: require('./../model/users.json'),
    setUsers: function (data) {this.users = data}
};
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req,res)=> {
    //on clinet also detele access token

    const cookies = req.cookies
    if(!cookies?.jwt){
        return res.sendStatus(204);
    }

    const foundUser = userDB.users.find(person=> person.refreshToken === refreshToken);

    if(!foundUser){
        res.clearCookie('jwt',{httpOnly:true});
        return res.sendStatus(204);
    }

    const otherUsers = userDB.users.filter(person=> person.username !== foundUser.username);
    const currentUser = {...foundUser,refreshToken:''};
    userDB.setUsers([...otherUsers,currentUser]);

    await fsPromises.writeFile(
        path.join(__dirname,"..","model","users.json"),
        JSON.stringify(userDB.users)
    );

    res.clearCookie('jwt',{
        httpOnly:true
    });
};


module.exports = {handleLogout};