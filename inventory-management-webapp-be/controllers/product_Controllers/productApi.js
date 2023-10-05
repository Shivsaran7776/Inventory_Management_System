const productSchema = require('../../models/productSchema');
const counterSchema=require('../../models/counterSchema')


const genId=async(req,res)=>{
    var seq1;
    var check_count=await counterSchema.findOne({_id:2}).select("seq");
    console.log('inside check',check_count);
    if(check_count == null){
        const ins=await new counterSchema({_id:2,seq:1})
        const output = await ins.save();
        seq1=1;
    }
    else{
       seq1=check_count.seq+1;
       console.log('count',seq1)
   
       var myQuery={_id:2};
       var query={$set:{seq:seq1}};
       const exe_query=async()=>{const exe=await counterSchema.updateOne(myQuery,query)}
       exe_query()
    }
    res.json({
        seq1
    })
}



const addProduct = async(req,res)=>{
    const product = await new productSchema(req.body);
    const result = await product.save();
    if(result){
        res.json({
            status:"Success",
            message:"Product Insertion Done"
        })
    }
    else{
        res.json({
            status:"Failed",
            message:"Product Insertion not Done"
        })
    }
}

const getProductOne=async(req,res)=>{
    console.log(req.body);
    const product = await productSchema.findOne({product_id:req.body.product_id});
    if(product){
        res.json({
            product
        })
    }
    else{
        res.json({
            message:"Failed to fetch product"
        })
        }
}

const getProduct=async(req,res)=>{
    console.log(req.body.item_category);
    console.log(req.body.item_type);
    const product = await productSchema.find({item_category:req.body.item_category,item_type:req.body.item_type}).select("product_id");
    if(product){
        res.json({
            product
        })
    }
    else{
        res.json({
            message: "Failed to fetch product"
        })
    }
}

const getAllProduct=async(req,res)=>{
    const product = await productSchema.find();
    if(product){
        console.log("ISIDE getAllProduct API"+product);
        res.json({
            product
        })
    }
    else{
        res.json({
            message: "Failed to fetch product"
        })
    }
}

const deleteProduct=async(req,res)=>{
    console.log(req.body.product_id);
    const product = await productSchema.deleteOne({product_id:req.body.product_id});
    if(product){
        res.json({
            message:"Successfully deleted"
        })
    }
    else{
        res.json({
            message:"Failed to fetch product"
        })
        }
}

const updateItem=async(req,res)=>{
    console.log("Update products",req.body);
    
    const item_category = req.body.item_category; 
    const item_type = req.body.item_type;
    const quantity = req.body.quantity;
    const item_id = req.body.itemid;


    const result = await productSchema.updateOne(
        {
            item_category:item_category,
            item_type:item_type,
            product_id : item_id
        },
        {
            $set:
            {
                quantity:quantity
            }
        }
    )
    if(result){
        res.json({
            status:"success",
            message:"updated successfully"
        })
    }
    else{
        res.json({
            status:"failure",
            message:"Failed to update product"
        })
        }
}

const getQuantity=async(req,res)=>{
    console.log(req.body.item_category);
    console.log(req.body.item_type);
    const product = await productSchema.find({item_category:req.body.item_category,item_type:req.body.item_type,product_id:req.body.product_id}).select("quantity");
    console.log(product)
    if(product){
        res.json({
            product
        })
    }
    else{
        res.json({
            message:"Failed to fetch product"
        })
        }
}

const uniqueCategory=async(req,res)=>{
    const category=await productSchema.distinct("item_category");
    if(category){
        res.json({
            category
        })
    }
}

const uniqueItemtype=async(req,res)=>{
    const data=await productSchema.find({item_category:req.body.itemcategory})
    let desired_output = (data) => {
        let unique_values =data
            .map((item) => item.item_type)
            .filter(
                (value, index, current_value) => current_value.indexOf(value) === index
            );
        return unique_values;
    };
    const item_type=desired_output(data);
    res.json({
         item_type
    })
}


module.exports={
    addProduct,
    getProduct,
    deleteProduct,
    getAllProduct,
    updateItem,
    getQuantity,
    getProductOne,
    uniqueCategory,
    uniqueItemtype,
    genId
}