const Product = require('../models/product.model')

exports.findAll = async (req,res) => {
    console.log('find all products');

    try{
    const result = await Product.find();

    res.status(200).json({data: result});
    }catch (err) {
        res.status(400).json({data : err});
        console.log("problemm in reading products",`${err}`);
    }
}

exports.findOne = async(req,res)=>{
    console.log("find a product");

    try{
        const product = req.params.product;

        const result = await Product.findOne({product : product});

        if(!result) {
            res.status(404).json({data: "this product didn t exists"})
        
        }else {
            res.status(200).json({data: result})
            console.log("product finded");
        }
    }catch(err) {
        res.status(400).json({data : err});
        console.log("problem is",`${err}`);
    }
}

exports.create = async (req,res) =>{
    console.log("insert product");

    console.log(req.body);

    const newProduct = new Product({
        product : req.body.product,
        cost : req.body.cost,
        description:req.body.description,
        quantity: req.body.quantity
       
    })

    try{
        
        const result = await newProduct.save();
        res.status(200).json({data: result});
        console.log('product saved')
            

    }catch(err) {
        res.status(400).json({data : err})
        console.log('probem in saving',`${err}`)
    }
}

exports.update = async(req,res) =>{
    const product = req.params.product;
    console.log("update product",product);

    const updateProduct = {
        product : req.body.product,
        cost : req.body.cost,
        description:req.body.description,
        quantity: req.body.quantity
    }

    try{

        const result= await Product.findOneAndUpdate(
            {product : product},
            updateProduct,
            {new :true} //tou lew ela kai dimiourghse to ean den yparxei
        )
        res.status(200).json({data : result})
        console.log("success in updating product: " , product);

    }catch(err) {

        res.status(400).json({data : err});
        console.log("problem in updating product", `${err}`)
    }

}

exports.delete = async(req,res) =>{
    const product = req.params.product;
    console.log("delete product", product);

    try{
        const result = await Product.findOneAndDelete(
            {product : product }
        )
        if (!result){
            const notFound = "data not found";
            res.status(400).json({data : notFound});
            console.log("Not found ", product)
        } else {
        res.status(200).json({data : result})
        console.log("success in deleting product" , product)
        }
    }catch(err) {
        res.status(400).json({data : err});
        console.log("problem with deleting product" ,`${err}`);
    }
}