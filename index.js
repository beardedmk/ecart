const express = require('express');
const User = require('./database/User');
const Product = require('./database/Product');
const cors = require("cors");
const { response } = require('express');

require ('./database/config');
const app = express();

app.use(express.json());
app.use(cors());


// signup route

app.post("/register", async (req,res)=>{

    const user = new User(req.body);
    let result = await user.save(); // saved to our data base


    // updating result to delete password so that it dont get send back in browser
    // first convert result to object than delete obj value ehatever you want
    result = result.toObject();
    delete result.password;
    res.send(result); // responding back data to website(frontend)
})


// login route

app.post("/login", async (req,res)=>{

    if(req.body.email && req.body.password)
    {
        let user = await User.findOne(req.body).select("-password")
        if(user) {res.send(user);}
        else {res.send({result: "No User Found !"})}
    }
    else
    {
        res.send({result: "Please Enter Your Email and Password"})
    }
})

// Add Products

app.post("/add-product", async (req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})


// list product

app.get(("/products"), async(req,res)=>{
    let products = await Product.find();

    if(products.length>0)
    {
        res.send(products)
    }
    else{
        res.send({result: "no products to show"})
    }
})

// delete


app.delete("/product/:id", async (req,res)=>{
        const result = await Product.deleteOne({_id:req.params.id});
        res.send(result);
})

// get single product to update it

app.get("/product/:id",async (req,res)=>{
    let result = await Product.findOne({_id:req.params.id})
    if(result)
    {
        res.send(result);
    }
    else{
        res.send({result:"No data"});
    }

})

// update product api and save it in database

app.put("/product/:id", async (req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set : req.body
        },
    )
    res.send(result);
})


// search

app.get("/search/:key",async (req,res)=>{
    let result = await Product.find({
    "$or": [
        {name : {$regex: req.params.key}},
        {company : {$regex: req.params.key}},
        {category : {$regex: req.params.key}}
    ]
});
res.send(result);
});

app.listen(5000);