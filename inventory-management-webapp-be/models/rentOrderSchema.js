const mongoose=require("mongoose");

const rentOrderSchema = new mongoose.Schema({
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
    requiredQuantity:{
        type:Number,
        required:true
    },
    orderDate:{
        type:Date,
        default:Date.now()
    },
    fromDate:{
        type:Date,
        required:true
    },
    toDate:{
        type:Date,
        required:true
    },
    rentPerDay:{
        type:Number,
        required:true
    },
    totalCost:{
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
    advanceAmount:{
        type:Number,
        required:true
    },
    balanceAmount:{
        type:Number,
        required:true
    }
})

module.exports = new mongoose.model('rentOrder',rentOrderSchema);