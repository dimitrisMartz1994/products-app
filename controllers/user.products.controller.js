const User = require('../models/user.model');

exports.findAll = async(req,res) =>{
    console.log('find all user product');

    try{
        const result = await User.find({},{_id:0,username:1,products:1});
        res.status(200).json({data:result});
        console.log("read all user products");
    }catch(err) {
        res.status(400).json({data: err});
        console.log("problem with find all products users",`${err}`)
    }
}

exports.findOne = async(req,res) =>{
    const username = req.params.username
    console.log('find  user products');

    try{
        const result = await User.findOne({username : username},{_id:0,username:1,products:1});
        res.status(200).json({data:result});
        console.log("read  products user", username);
    }catch(err) {
        res.status(400).json({data: err});
        console.log("problem with find all products users",`${err}`,username)
    }
}

exports.create = async(req,res) => {
    const username =req.body.username;
    const products = req.body.products;
    console.log("update with products");

    try{
        const result = await User.updateOne({username : username},
            {
                $push:{
                    products : products
                }
            }
        )
        res.status(200).json({data: result});
        console.log("success to update products")

    }catch(err) {
        res.status(400).json({data: err});
        console.log("fail to update");
    }
}

exports.update = async(req,res) => {
    const username = req.params.username;
    const _id = req.body.product._id;
    const quantity = req.body.quantity;

    console.log("update product for " , username);

    try{
        const result = await User.updateOne({username : username, "product_id" : _id},
            {
                $set : {
                  "products.$.quantity" : quantity
                }
            })

            res.status(200).json({data : result});
            console.log("success in updating")
    }catch(err) {
        res.status(400).json({data: err});
        console.log("fail to update product",username)
    }
}


exports.delete = async(req,res) => {
    const username = req.params.username;
    const _id = req.params.id;

    console.log("delete product");

    try{
        const result = await User.updateOne({username : username },{
            $pull : {
                products : {_id : _id}
            }
        })

        res.status(200).json({data : result });
        console.log("success to deleting product");
    }catch(err) {
        res.status(400).json({data: err});
        console.log("fail to delete product",username)
    }

}