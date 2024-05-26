const { Router } = require("express");
const glasscleanerModel = require("../models/glasscleanerModel");

const glasscleanerRouter = Router();

glasscleanerRouter.post("/glasscleaner",async(req,res)=>{
     const {productname, productimage, new_price, old_price, quantity} = req.body;
     console.log(req.body);
     try{
          const glasscleaners = new glasscleanerModel({productname, productimage, new_price, old_price, quantity});
          await glasscleaners.save();
          res.status(201).json({
               message: "glass product created successfully"
          });
     }catch(error){
          res.status(500).json({
               message: "Error creating product", error
          });
     };
});

module.exports = glasscleanerRouter;