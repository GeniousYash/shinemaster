const mongoose = require('mongoose');

const glasscleanerSchema = new mongoose.Schema({
     productname: {type: String, required: true},
     productimage:{type:String, required:true},
     new_price: {type: Number, required: true},
     old_price: {type: Number, required: true},
     quantity: {type: Number, required: true},
});

const glasscleanerModel = mongoose.model('glasscleaners',glasscleanerSchema);

module.exports = glasscleanerModel;