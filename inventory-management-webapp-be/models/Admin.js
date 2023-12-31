const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
    },
    otp:{
        type: Number
    }
})

// add timestamps automatically
adminSchema.set('timestamps',true);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;