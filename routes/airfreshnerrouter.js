const { Router } = require("express");
const airfreshnerModel = require("../models/airfreshnerModel");

const airfreshnerRouter = Router();

airfreshnerRouter.post("/airfreshner",async(req,res)=>{
     const {productname,productimage, new_price, old_price, quantity} = req.body;
     console.log(req.body);
     try{
          const airfreshners = new airfreshnerModel({productname,productimage, new_price, old_price, quantity});
          await airfreshners.save();
          res.status(201).json({
               message: "airfreshner product created successfully"
          });
     }catch(error){
          res.status(500).json({
               message: "Error creating product", error
          });
     };
});

module.exports = airfreshnerRouter;