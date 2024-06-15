const mongoose=require('./mogoconnect');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const password = encodeURIComponent("unlock@admin");
// mongoose.connect('mongodb://0.0.0.0:27017/cfg');

const adminSchema=mongoose.Schema({
    Name:String,
    Email:String,
    Password:String,
    role:{type:String,default:"admin"}
})

// Hashing password
adminSchema.pre('save',async function(next){
    if(this.isModified('Password')){
        this.Password= await bcrypt.hash(this.Password,12);
    }
    next();
});

const admin=mongoose.model("admin",adminSchema);
module.exports=admin;


