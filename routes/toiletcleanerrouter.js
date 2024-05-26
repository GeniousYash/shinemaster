const { Router } = require("express");
const toiletcleanerModel = require("../models/toiletcleanerModel");

const toiletcleanerRouter = Router();

toiletcleanerRouter.post("/toiletcleaner",async(req,res)=>{
     const {productname, productimage, new_price, old_price, quantity} = req.body;
     console.log(req.body);
     try{
          const toiletcleaners = new toiletcleanerModel({productname, productimage, new_price, old_price, quantity});
          await toiletcleaners.save();
          res.status(201).json({
               message: "toilet product created successfully"
          });
     }catch(error){
          res.status(500).json({
               message: "Error creating product", error
          });
     };
});

module.exports = toiletcleanerRouter;