const mongoose=require('./mogoconnect');
// mongoose.connect('mongodb://0.0.0.0:27017/cfg');

const bcrypt=require('bcryptjs');

const artistSchema=mongoose.Schema({
   Name:String,
   Email:String,
   Password:String,
   role:{type:String,default:"artist"},
   profile_pic:String
})

artistSchema.pre('save',async function(next){
   if(this.isModified('Password')){
       this.Password= await bcrypt.hash(this.Password,12);
   }
   next();
});

const artists=mongoose.model("artist",artistSchema);
module.exports=artists;


