mongoose = require("mongoose");
Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        index: {unique: true}
    },
    mobile: {
        type: String,
        trim: true,
        index: {unique: true}
    },
    password: String,
    user_role: {},
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
