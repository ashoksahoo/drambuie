/**
 * Created by Ashok on 07-05-2015.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PropertySchema = new Schema({});

module.exports = mongoose.model('Property', PropertySchema);
