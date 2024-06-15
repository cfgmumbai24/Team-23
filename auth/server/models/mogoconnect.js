const mongoose=require('mongoose');
const env=require('dotenv');
env.config({ path: './config.env' });

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongo DB connected succesfuly")}).catch((err)=>{console.log(err)});

module.exports=mongoose;