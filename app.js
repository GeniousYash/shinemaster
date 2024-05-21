const express = require("express");
// const dotenv = require('dotenv').config();

const mongoose = require("mongoose");
// const pathconnect = process.env.connect;
// const dbconnection = () => {
//      mongoose.connect(pathconnect);
// }


// const productRouter = require('./routes/productRouter');


const app = express();
// const PORT = process.env.PORT || 4000;
const PORT = 4000;
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json()); 
app.use(cors());
// app.use("/addproduct",productRouter);

mongoose.connect("mongodb+srv://singhyash3012:shine@cluster0.jv193se.mongodb.net/shinemaster?retryWrites=true&w=majority&appName=Cluster0");

// API connection
app.get("/",(req,res)=>{
     res.send("Express App is running");
});

// Image storage engine
const storage = multer.diskStorage({
     destination: './upload/images',
     filename: (req, file, cb) => {
          return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
     }
})

const upload = multer({storage:storage})
// creating upload endpoint for images
app.use('/images', express.static('upload/images'))
app.post('/upload', upload.single('product'), (req,res)=>{
     res.json({
          success: 1,
          image_url: `http://localhost:${PORT}/images/${req.file.filename}`
     });
});


const Product = mongoose.model("Product",{
     id: {
          type: Number,
          required: true,
     },
     name: {
          type: String,
          required: true,
     },
     image: {
          type: String,
          required: true,
     },
     category: {
          type: String,
          required: true,
     },
     new_price: {
          type: Number,
          required: true,
     },
     old_price: {
          type: Number,
          required: true,
     },
     date: {
          type: Date,
          default: Date.now,
     },
     available: {
          type: Boolean,
          default: true,
     },
});

// creating api for add product

app.post('/addproduct', async(req, res)=>{
     let products = await Product.find({});
     let id;
     if(products.length>0){
          let last_product_array = products.slice(-1);
          let last_product = last_product_array[0];
          id = last_product.id +1;
     }else{
          id=1;
     }

     const product = new Product({
          id: req.body.id,
          name: req.body.name,
          image: req.body.image,
          category: req.body.category,
          new_price: req.body.new_price,
          old_price: req.body.old_price,
     });
     console.log(product);
     await product.save();
     console.log("Saved");
     res.json({
          success: true,
          name: req.body.name,
     })
})


// creating api for deleting products
app.post('/removeproduct', async(req,res)=>{
     await Product.findOneAndDelete({id:req.body.id});
     console.log("Remove");
     res.json({
          success: true,
          name: req.body.name,
     })
})

// creating api to get all products
app.get('/allproducts',async(req,res)=>{
     let products = await Product.find({})
          console.log("All Product Fetched");
          res.send(products);
});

// Schema for User model
const User = mongoose.model("User",{
     name:{
          type:String,
          required:true,
     },
     email:{
          type:String,
          unique:true,
     },
     password:{
          type:String,
          required:true
     },
     cartData:{
          type:Object,
     },
     date:{
          type:Date,
          default: Date.now,
     },
});

// creating endpoint for registration
app.post('/signup', async(req,res)=>{
     let check = await User.findOne({email:req.body.email});
     if(check){
          return res.status(400).json({success: false, errors: "Existing user found with same email address"});
     }
     let cart = {};
     for(let i=0; i<300; i++){
          cart[i] = 0;
     }
     const user = new User({
          name:req.body.username,
          email:req.body.email,
          password:req.body.password,
          cartData: cart,
     })
     await user.save();

     const data = {
          user:{
               id:user.id
          }
     }
     const token = jwt.sign(data, 'secreat_ecom');
     res.json({success: true, token})
})

// creating endpoint for user login
app.post('/login', async(req,res)=>{
     let user = await User.findOne({email: req.body.email});
     if(user){
          const passMatch = req.body.password === user.password;
          if(passMatch){
               const data = {
                    user:{
                         id:user.id
                    }
               }
               const token = jwt.sign(data,"secreat_ecom");
               res.json({success: true, token});
          }else{
               res.json({success: false, errors: "Wrong Password"});
          }
     }else{
          res.json({success:false, errors:"Wrong Email Address"});
     }
})

// 

app.listen(PORT, async(error) =>{
     try{
          // await dbconnection();
          console.log(`Listening to the Port ${PORT} & connected to DB Successfully`);
     } catch(error){
          console.error("Error connecting to MongoDB:", error);
     }
})



// mongodb+srv://singhyash3012:shine@cluster0.jv193se.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0