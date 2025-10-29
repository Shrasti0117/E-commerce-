const port =4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer")
const path =require("path");
const cors = require("cors");
const { type } = require("os");
const { error } = require("console");

app.use(express.json())
app.use(cors());

mongoose.connect("mongodb+srv://guptashrasti25:guptash%4001@cluster0.tus3j2l.mongodb.net/E-commerce?retryWrites=true&w=majority")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));



app.get("/",(req,res)=>{
    res.send("Express app is running")
})

//image storage engine

const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload= multer({storage:storage})

app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//schema for creating products

const Product = mongoose.model("product",{
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    image:{
      type:String,
        required:true,
    },
    category:{
         type:String,
        required:true,
    },
    new_price:{
         type:String,
        required:true,
    },
    old_price:{
         type:String,
        required:true,
    },
    date:{
        type:Date,
        default: Date.now,
    },
    avilable:{
        type:Boolean,
        default:true,
    }
})
app.post('/addproduct',async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id=last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//creating API for deleting products

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

//creating API for getting all products
app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("all products fetched");
    res.send(products);
})

//schema creating for user model 
const Users = mongoose.model('Users',{
  name:{
    type:String,
  },
  email:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
  },
   cartData:{
    type:Object,
   },
   date:{
    type:Date,
    default:Date.now,
   }
}
)

app.post('/signup',async(req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with same email id "})
    }
    let cart={}
    // Initialize cart keys from 1..300 to match frontend convention
    for(let i=1;i<=300;i++){
        cart[i]=0;
    }
    const user =new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data ={
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

//creating end point for user login 
app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
   if(user){
    const passCompare = req.body.password === user.password;
    if(passCompare){
        const data = {
            user:{
                id:user.id
            }
        }
        const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
    }
    else{
        res.json({success:false,errors:"wrong password"});
    }
   }
   else{
    res.json({success:false,errors:"Wrong Email Id"})
   }
})

//creating endpoint for newcollection data

app.get('/newcollection',async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

//creating middleware to frtch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "please authenticate using valid token" });
    }
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        return next();
    } catch (error) {
        return res.status(401).send({ errors: "please authenticate using a valid token" });
    }
};

//creating endpoint for popular in women section
app.get('/popularinwomen',async(req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("popular in women Fetched");
    res.send(popular_in_women);
})

//creatin endpoint for adding products in cartdata 
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("added", req.body.itemId);
    try {
        const userId = req.user.id;
        const itemId = String(req.body.itemId); // Always use string keys for object
        let userData = await Users.findOne({ _id: userId });
        if (!userData) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        // Ensure cartData exists and itemId is valid
        if (!userData.cartData) userData.cartData = {};
        if (!userData.cartData[itemId]) userData.cartData[itemId] = 0;
        userData.cartData[itemId] = Number(userData.cartData[itemId]) + 1;
        await Users.findOneAndUpdate({ _id: userId }, { cartData: userData.cartData });
        res.json({ success: true, message: 'Cart updated', cartData: userData.cartData });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

//creating end point to remove  product from cart data
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);
    try {
        const userId = req.user.id;
        const itemId = String(req.body.itemId); // Always use string keys for object
        let userData = await Users.findOne({ _id: userId });
        if (!userData) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        // Ensure cartData exists and itemId is valid
        if (!userData.cartData) userData.cartData = {};
        if (!userData.cartData[itemId]) userData.cartData[itemId] = 0;
        userData.cartData[itemId] = Math.max(Number(userData.cartData[itemId]) - 1, 0);
        await Users.findOneAndUpdate({ _id: userId }, { cartData: userData.cartData });
        res.json({ success: true, message: 'Cart updated', cartData: userData.cartData });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});



app.listen(port,(error)=>{
   if(!error){
    console.log("server Running on port "+port)
   }
   else{
    console.log("Error :" +error)
   }
})