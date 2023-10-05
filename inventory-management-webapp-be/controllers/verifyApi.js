const otpSchema=require('../models/otpModel');
const Schema=require('../models/userSchema');
const bcrypt=require('bcrypt');

const verifyUser=async(req,res)=>{
    console.log(req.body)
    const User=await Schema.findOne({email:req.body.email});
    if(!User){
        console.log(User);
        res.json({
            data:"User not found"
        })
    }
    else{
        res.send("Verified")
    }
}


const verifyOtp=async(req,res)=>{
    try{
            const User=await otpSchema.findOne({email:req.body.email});
            
            if(User.length<=0){
                 throw new Error("Account doesn't exist");
            }
            else{
                // const {Expired}=User;
                // if(Expired<Date.now()){
                //     await otpSchema.deleteMany({email:req.body.email});
                //     throw new Error("OTP Expired");
                // }
                // else{
                    const pass_otp=req.body.otp;
                    
                    console.log(User.otp);
                    console.log(pass_otp);
                    if(await bcrypt.compare(pass_otp,User.otp)){
                        console.log("INSIDE VALID OTP JSON");
                        res.json({
                            data:"valid"
                        })
                        await otpSchema.deleteMany({email:req.body.email});
                    }
                    else{
                        console.log("INSIDE VALID OTP JSON - FAILURE");
                        res.json({
                            data:"otp not verified"
                        })
                    }
                // }
            }
            

     }
     catch(err){
         res.json({
            message:err.message
         })
     }
    
}


// const verifyOtp=async(req,res)=>{
//         try{
//             const User=await otpSchema.findOne({email:req.body.email});
//             if (!User) {
//                 return res.status(404).json({ data: 'User not found' });
//               }
            
//               if (User.otp === otp) {
//                 return res.status(200).json({ data: 'OTP verified successfully' });
//               } else {
//                 return res.status(401).json({ data: 'Incorrect OTP' });
//               }
//         }
//         catch(er){

//         }
//     }

module.exports={verifyUser,verifyOtp}