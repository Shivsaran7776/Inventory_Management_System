const mongoose=require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/Sample_Insert').then(()=>{
    console.log('connected');
}).catch((err)=>{
    console.log("Error");
})