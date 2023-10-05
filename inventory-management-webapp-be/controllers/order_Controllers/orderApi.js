const orderSchema = require('../../models/orderSchema');
const productSchema=require('../../models/productSchema');
const counterSchema=require('../../models/counterSchema');
const rentOrderSchema = require('../../models/rentOrderSchema');

const updateStock = async(req,res)=>{
    var myQuery={item_category:req.body.item_category,item_type:req.body.item_type,product_id:req.body.product_id};
    var query={$set:{quantity:req.body.stock}};
    const result=async()=>{const exe=await productSchema.updateOne(myQuery,query)
        if(exe){
            res.json({
                message:"Successfully Updated"
            })
        }
        else{
            res.json({
                message:"Not able to Update"
            })
        }};
    result();
}

const orderDetails=async(req,res)=>{
    var seq1;
    var check_count=await counterSchema.findOne({_id : 1}).select("seq");
    console.log('inside check',check_count);
    if(check_count == null){
        const ins=await new counterSchema({_id:1,seq:1})
        const output = await ins.save();
        seq1=1;
    }
    else{
       seq1=check_count.seq+1;
       console.log('count',seq1)
   
       var myQuery={_id:1};
       var query={$set:{seq:seq1}};
       const exe_query=async()=>{const exe=await counterSchema.updateOne(myQuery,query)}
       exe_query()

    }
    const order='ORD'+seq1.toString();
    console.log('order id',order)
    const data=await new orderSchema({
        order_id:order,
        item_category:req.body.item_category,
        item_type:req.body.item_type,
        product_id:req.body.product_id,
        stock:req.body.stock,
        customer_name:req.body.customer_name,
        customer_address:req.body.customer_address,
        phone_number:req.body.phone_number
    });
    const result = await data.save();
    if(result){
        res.json({
            status:"Success",
            message:"Insertion Done"
        })
    }
    else{
        res.json({
            status:"Failed",
            message:"Insertion not Done"
        })
    }
}

const rentOrderDetails = async(req,res) => {
    var seq1;
    var check_count = await counterSchema.findOne({_id:1}).select("seq");
    console.log('inside check',check_count);
    if(check_count == null){
        const ins=await new counterSchema({_id:1,seq:1})
        const output = await ins.save();
        seq1=1;
    }
    else{
       seq1=check_count.seq+1;
       console.log('count',seq1)
   
       var myQuery={_id:1};
       var query={$set:{seq:seq1}};
       const exe_query=async()=>{const exe=await counterSchema.updateOne(myQuery,query)}
       exe_query()
    }
    const order='ORD'+seq1.toString();
    console.log('order id',order);
    var date1 = new Date(req.body.fromDate);
    var date2 = new Date(req.body.toDate);     
    var diffInMs = Math.abs(date2-date1);
    console.log("Diff In MS : "+diffInMs);
    var msPerDay = 24 * 60 * 60 * 1000;
    var diffInDays = Math.floor(diffInMs / msPerDay);
    var tCost = Number(req.body.requiredQuantity) * Number(req.body.rentPerDay) * Number(diffInDays);
    var bAmount = tCost - Number(req.body.advanceAmount);
    console.log("Tcost : "+tCost+"\nBAmount : "+bAmount);
    console.log("Quantity : "+req.body.requiredQuantity);
    console.log("\nRent : "+req.body.rentPerDay);
    console.log("\nAdvance : "+req.body.advanceAmount);
    console.log("\nDays : "+diffInDays);
    const data = await new rentOrderSchema({
        order_id:order,
        item_category:req.body.item_category,
        item_type:req.body.item_type,
        product_id:req.body.product_id,
        requiredQuantity:req.body.requiredQuantity,
        fromDate:req.body.fromDate,
        toDate:req.body.toDate,
        rentPerDay:req.body.rentPerDay,
        totalCost:Number(tCost),
        customer_name:req.body.customer_name,
        customer_address:req.body.customer_address,
        phone_number:req.body.phone_number,
        advanceAmount:req.body.advanceAmount,
        balanceAmount:Number(bAmount)
    });
    const result = await data.save();
    if(result){
        res.json({
            status:"Success",
            message:"Insertion Done at Rent Order"
        })
    }
    else{
        res.json({
            status:"Failed",
            message:"Insertion not Done at Rent Order"
        })
    }
}

module.exports = {
    orderDetails,
    updateStock,
    rentOrderDetails
}