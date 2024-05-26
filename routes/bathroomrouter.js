const { Router } = require("express");
const bathroomModel = require("../models/bathroomcleanerModel");

const bathroomcleanerRouter = Router();

bathroomcleanerRouter.post("/bathroomcleaner",async(req,res)=>{
     const {productname, productimage, new_price, old_price, quantity} = req.body;
     console.log(req.body);
     try{
          const bathroomcleaners = new bathroomModel({productname, productimage, new_price, old_price, quantity});
          await bathroomcleaners.save();
          res.status(201).json({
               message: "Bathroom Cleaner product created successfully"
          });
     }catch(error){
          res.status(500).json({
               message: "Error creating product", error
          });
     };
});

module.exports = bathroomcleanerRouter;