const mongoose = require('mongoose');

const OwenersSchema = new mongoose.Schema({
     fullname: {type: String, required: true},
     email:{type:String, required:true},
     password: {type: Number, required: true},
});

const OwenersModel = mongoose.model('Oweners',OwenersSchema);

module.exports = OwenersModel;