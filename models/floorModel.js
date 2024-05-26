const mongoose = require('mongoose');

const floorcleanerSchema = new mongoose.Schema({
     productname: {type: String, required: true},
     productimage:{type:String, required:true},
     new_price: {type: Number, required: true},
     old_price: {type: Number, required: true},
     quantity: {type: Number, required: true},
});

const floorModel = mongoose.model('floorcleaners',floorcleanerSchema);

module.exports = floorModel;