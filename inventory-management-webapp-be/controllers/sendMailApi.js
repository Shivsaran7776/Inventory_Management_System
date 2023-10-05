const schema=require('../models/userSchema');
const jwt=require('jsonwebtoken');
const otpGenerator=require('otp-generator');
const nodemailer=require("nodemailer");
const Otp=require('../models/otpModel');
const bcrypt=require('bcrypt');

const sendMail=async(req,res)=>{
    try{
        const email=req.body.email;
        console.log(email);
        const choice=req.body.choice;
        var content, OTP;

        const olduser=await schema.findOne({email:email});
        console.log(olduser);
        if(!olduser){
          res.json({
            message:"no user found"
          })
        }

        if(choice==1){
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const token=jwt.sign({email:olduser.email,_id:olduser._id},secret,{
              expiresIn:"3m"
            })
            content = 'Welcome to Inventory Management System !!!\n\n'
                      + 'Here is the Link provided for setting up your Password for your Login : \n\n';
            content = content + `http://localhost:3000/SetPassword/${token}`;
            console.log(content);
        }

        if(choice== 2 ){
            OTP = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });
            content = 'Welcome to Inventory Management System !!!\n\n'
            + 'Here is the OTP provided for resetting your Password : \n\n';
            content = content + OTP;
            console.log(content);
            bcrypt.hash(OTP,0,(err, hash)=>{
              if(err){
                  next(err)
              }
              else{
                  const result=async()=>{
                  const user=await Otp.findOne({email:olduser.email});
                  console.log("user in otp",user);
                  if(user){
                    console.log("user exist in otp");
                    const result=await Otp.deleteOne({email:olduser.email});
                    if(result){
                      const otp=new Otp({email:olduser.email,otp:hash});
                      const res= await otp.save();
                    }
                  }
                  else{
                    const otp=new Otp({email:olduser.email,otp:hash});
                    const res= await otp.save();
                    //setTimeout(myFunc,15000,olduser.email);
                  }
                  function myFunc(arg){
                    console.log(`${arg}`);
                    query={email:`${arg}`};
                    console.log("inside settime");
                    var up_otp={$set:{otp:"Expired"} };
                    const result=async()=>{const res=await Otp.updateOne(query,up_otp)};
                    result();
                  }
                };
                 result();
                 if(result){
                  console.log(result)
                 }
              }
            })

        }
        
       var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rm3956709@gmail.com',
              pass: 'qsxmmfcytwfrwsyq'
            }
          });
          
          var mailOptions = {
            from: 'rm3956709@gmail.com',
            to: email,
            subject: 'Sending Email',
            text: content
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.json({
                "status":"Success",
                "message":content
              })
            }
          });
    }
    catch(e){
        console.log(e);
    }
}

module.exports={sendMail}