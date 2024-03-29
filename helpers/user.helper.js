const user = require('../models/user.model');

async function findLastInsertedUser() {
    console.log("find last inserted user");

    try{
        const result = await user.find({}).sort({_id : -1}).limit(1);//epistrefei pinaka 
        return result[0];
    }catch(err) {
        console.log("promble in finding user" , err);
        return false;
    }
}

module.exports = {findLastInsertedUser};
