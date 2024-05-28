const { Router } = require("express");
const OwenersModel = require("../models/OwenerModel");

const OwenersRouter = Router();

OwenersRouter.post("/oweners",async(req,res)=>{
     let oweners = await OwenersModel.find();
     if(oweners>0){
          return res.send(501).status("You don't have permission to create a New Owener");
     }
     const {fullname, email, password} = req.body;
     console.log(req.body);
     try{
          const oweners = new OwenersModel({fullname, email, password});
          await oweners.save();
          res.status(201).json({
               message: "owener registered successfully"
          });
     }catch(error){
          res.status(500).json({
               message: "Error creating product", error
          });
     };
});

module.exports = OwenersRouter;