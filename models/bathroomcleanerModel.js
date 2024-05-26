const mongoose = require('mongoose');

const bathroomcleanerSchema = new mongoose.Schema({
     productname: {type: String, required: true},
     productimage:{type:String, required:true},
     new_price: {type: Number, required: true},
     old_price: {type: Number, required: true},
     quantity: {type: Number, required: true},
});

const bathroomModel = mongoose.model('bathroomcleaners',bathroomcleanerSchema);


module.exports = bathroomModel;