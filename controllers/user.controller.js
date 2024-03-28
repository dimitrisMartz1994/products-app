const User = require('../models/user.model')
const logger = require('../logger/logger');

exports.findAll = async (req,res) => {
    console.log('find all users');

    try{
    const result = await User.find();

    res.status(200).json({data: result});
    logger.debug("success in reading all users");
    logger.info("success in reading all users")
    }catch (err) {
        console.log("problemm in reading users.${err")
        logger.error(`problem in reading all users,${err}`);
    }
}

exports.findOne = async(req,res)=>{
    console.log("find a user");

    try{
        const username = req.params.username;

        const result = await User.findOne({username : username});
        res.status(200).json({data: result})
    }catch(err) {
        console.log("problem is",`${err}`)
    }
}

exports.create = async (req,res) =>{
    console.log("insert user");

    console.log(req.body);

    const newUser = new User({
        username : req.body.username,
        password : req.body.password,
        name : req.body.name,
        surname:req.body.surname,
        email: req.body.email,
        address : req.body.address,
        phone: req.body.phone,
        products: req.body.products
    })

    try{
        const result = await newUser.save();
        res.status(200).json({data: result});
        console.log('user saved')
    }catch(err) {
        res.status(400).json({data : err})
        console.log('probem in saving',`${err}`)
    }
}

exports.update = async(req,res) =>{
    const username = req.params.username;
    console.log("update username",username);

    const updateUser = {
        name : req.body.name,
        surname : req.body.surname,
        email : req.body.email,
        address : req.body.address,
        phone : req.body.phone
    }

    try{

        const result= await User.findOneAndUpdate(
            {username : username},
            updateUser,
            {new :true} //tou lew ela kai dimiourghse to ean den yparxei
        )
        res.status(200).json({data : result})
        console.log("success in updating user: " , username);

    }catch(err) {

        res.status(400).json({data : err});
        console.log("problem in updating user", `${err}`)
    }

}

exports.delete = async(req,res) =>{
    const username = req.params.username;
    console.log("delete username", username);

    try{
        const result = await User.findOneAndDelete(
            {username : username }
        )
        if (!result){
            const notFound = "data not found";
            res.status(400).json({data : notFound});
            console.log("Not found ", username)
        } else {
        res.status(200).json({data : result})
        console.log("success in deleting user" , username)
        }
    }catch(err) {
        res.status(400).json({data : err});
        console.log("problem with deleting user" ,`${err}`);
    }
}