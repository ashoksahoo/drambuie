/**
 * Created by Ashok on 07-05-2015.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PropertySchema = new Schema({
    date : Date,
    name : String,
    address: String,
    amount: Number,
    images: [],
    googleMaps: {}
});

module.exports = mongoose.model('Property', PropertySchema);
