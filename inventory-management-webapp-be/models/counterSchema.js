const mongoose=require("mongoose");

const counterSchema=new mongoose.Schema({
    _id:{
       type:Number,
       required:true
    },
    seq:{
        type:Number,
        required:true
    },
});

module.exports=new mongoose.model('counter',counterSchema);