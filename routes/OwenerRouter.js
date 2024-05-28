const { Router } = require("express");
const OwenersModel = require("../models/OwenerModel");

const OwenersRouter = Router();

OwenersRouter.post("/oweners",async(req,res)=>{
     let owenerscheck = await OwenersModel.find({});
     if(owenerscheck.length>0){
          return res.status(501).send("You don't have permission to create a New Owener");
     }else{
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
                    message: "Error creating New Owener", error
               });
               console.log(error);
          };
     }
});

module.exports = OwenersRouter;