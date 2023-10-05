const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
    order_id:{
       type:String,
       required:true
    },
    item_category:{
        type:String,
        required:true
    },
    item_type:{
        type:String,
        required:true
    },
    product_id:{
        type:String,
        required: true
    },
    stock:{
        type:Number,
        required:true
    },
    customer_name:{
        type:String,
        required:true
    },
    customer_address:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now()
    }
})

module.exports=new mongoose.model('order',orderSchema);