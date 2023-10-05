const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema=new mongoose.Schema({
    shopname:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
    },
    roles:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'Pending'
    }
})
module.exports=new mongoose.model('users',userSchema);