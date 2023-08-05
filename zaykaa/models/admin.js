var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var admin = new Schema(
    {
        role: { 
            type: String, 
            default: 'admin' 
        },
        email : {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password : {
            type: String,
            required: true,
            minlength: 8
        }
    }
);

module.exports = mongoose.model('Admin', admin);