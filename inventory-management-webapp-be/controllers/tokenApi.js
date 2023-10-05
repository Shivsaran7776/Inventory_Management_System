const schema=require('../models/userSchema');
const jwt=require('jsonwebtoken');

const postApi=async(req,res)=>{
    // const token=req.body.token;
    // console.log(token);
    // const verify=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    // const result=await schema.findOne({email:verify.email}).select("-password");
    return res.send(result._id);
    //return res.json(result.filter(post=>post.email==req.body.token))
}

/*const loginApi=async(req,res)=>{
    const email=req.body.email;
    const user={name:email};
    const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
    res.json({accessToken:accessToken})
}*/
const unhashToken=async(req,res)=>{
    const token=req.body.token;
    const details=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    if(details){
        res.json({
            email:details.email,
            shopname:details.shopname
        })
    }
    else{
        console.log("unhashToken failed");
    }
}

const verifyUser=async(req,res)=>{
    const token=req.body.token;
    console.log("inside verify token",token);
    try{
        const check=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const result=await schema.findOne({email:check.email}).select("-password");
        const olduser=await schema.findOne({_id:result.id});
        if(!olduser){
            return res.send("No user found")
        }
        if (olduser.status=="Active"){
            return res.send("Already Set your Password");
        }
        
        return res.send(olduser._id);
        
    }catch(err){
        res.send("Link Expired");
    }
    
}

module.exports={postApi,verifyUser,unhashToken}   
