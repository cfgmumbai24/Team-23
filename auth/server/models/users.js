const mongoose=require('./mogoconnect');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
// mongoose.connect('mongodb://0.0.0.0:27017/cfg');

const userSchema=mongoose.Schema({
    Name:String,
    Email:String,
    Password:String,
    Phone:Number    
})

// Hashing the password
userSchema.pre('save',async function(next){
    if(this.isModified('Password')){
        this.Password= await bcrypt.hash(this.Password,12);
    }
    next();
});


const user=mongoose.model("users",userSchema);
module.exports=user;


