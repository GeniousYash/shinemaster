const { Router } = require("express");
const floorModel = require("../models/floorModel");

const floorcleanerRouter = Router();

floorcleanerRouter.post("/floorcleaner",async(req,res)=>{
     const {productname, productimage, new_price, old_price, quantity} = req.body;
     console.log(req.body);
     try{
          const floorcleaners = new floorModel({productname, productimage, new_price, old_price, quantity});
          await floorcleaners.save();
          res.status(201).json({
               message: "FloorCleaner product created successfully"
          });
     }catch(error){
          res.status(500).json({
               message: "Error creating product", error
          });
     };
});

module.exports = floorcleanerRouter;