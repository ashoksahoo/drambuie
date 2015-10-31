/**
 * Created by Ashok on 04-05-2015.
 */

var User = require('../app/models/users');

module.exports = function() {
    User.findOne({'user_role.code': 10}, function(err, obj) {
        if(!obj) {
            User.create({
                email: "admin@ashok.io",
                password: "Admin@123",
                user_role: {name: "Admin", code: 10}
            }, function(err, obj) {
                if(obj) {
                    console.log("Admin user created with email:" + obj.email + " & password:" + obj.password + ".")
                }
            })
        }
    })
};