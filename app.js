const express = require('express');

const app = express();

const port =3000;

const mongoose = require('mongoose');

app.use(express.json()); //το εχω για οταν θελω να κανω post

const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require('./swagger');

mongoose.connect(process.env.MONGODB_URI).then(
        () => {console.log('connection to mongodb is ok')},
        err => {console.log('fail to connect to mogodb',err)}
         );

const user = require("./roots/user.root");
const userProduct = require('./roots/user.products.roots');
const product = require("./roots/product.root");

app.use('/api/users',user) //midle function

app.use('/api/user-products', userProduct);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument.options));

app.use('/api/product',product);

app.use("/",express.static("files"));


app.listen(port, () => {
    console.log('server  is listening')
});