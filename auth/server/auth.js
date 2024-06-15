const express = require('express');
const router = express.Router();
const student = require('./models/students');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const admins=require('./models/admins');
const mentors=require('./models/mentors');
const transporter=require('./mailer');
const middleware=require('./middleware/jwtverifier')


env.config({ path: './config.env' });

//Signup Route
router.post('/signup', async (req, res) => {

    if (req.body.googleAccessToken) {
        const { googleAccessToken } = req.body;
        let response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": `Bearer ${googleAccessToken}`,
                'Content-Type': 'application/json'
            },
            method: "get",

        })
        response = await response.json();
        const name = response.name;
        const firstname = response.given_name;
        const lastName = response.family_name;
        const email = response.email;
        const picture = response.picture;
        let existingUser = await student.findOne({ Email: email }).select("-Password")
        if (existingUser) {

            let token = jwt.sign({ _id: existingUser._id,role:existingUser.role}, process.env.JWT_SECRET);
            // res.cookie('jwtoken', token, {
            //     expires: new Date(Date.now() + 2592000),
            //     httpOnly: true
            // })
            existingUser.Password=undefined;

            return res.status(200).send({ user:existingUser, message: "User logged in successfully", success: 1, jwtoken: token });

        }

        let usercreated = new student({
            Name: name,
            Email: email,
            profile_pic:picture,
            acc_type:"google"
        });
        console.log(req.body);

        let result = await usercreated.save();

        let token = jwt.sign({ _id: usercreated._id, role:usercreated.role }, process.env.JWT_SECRET);
        // res.cookie('jwtoken', token, {
        //     expires: new Date(Date.now() + 2592000),
        //     httpOnly: true
        // })
         usercreated.Password=undefined;
         result.Password=undefined;
        return res.status(200).send({ user:result, message: "User logged in successfully", success: 1, jwtoken: token });

    }

    else {

        try {
            const email = req.body.Email;
            const userExist = await student.findOne({ Email: email });
            if (userExist) {
                return res.status(422).send({success:0,message:"User already exist" });
            }

            let usercreated = new student(req.body);
            console.log(req.body);
            let result = await usercreated.save();
            let token = jwt.sign({ _id: usercreated._id, role:usercreated.role}, process.env.JWT_SECRET);
            usercreated.Password=undefined;
            result.Password=undefined;
            return res.status(200).send({ user:result, message: "User logged in successfully", success: 1, jwtoken: token });
            
        }
        catch (err) {
            console.log(err);
        }
    }

    // res.send("Sign up chal raha hai")
})


const checkrole=async(email)=>{

    let userLogin = await admins.findOne({ Email: email });
    if(userLogin){
        return userLogin;
    }
    userLogin = await mentors.findOne({ Email: email });
    if(userLogin){
        return userLogin;
    }
    userLogin = await student.findOne({ Email: email });
    if(userLogin){
        return userLogin;
    }
    return false;
}


//Login Route
router.post('/login', async (req, res) => {
    
    if (req.body.googleAccessToken) {
        const { googleAccessToken } = req.body;
        let response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": `Bearer ${googleAccessToken}`,
                'Content-Type': 'application/json'
            },
            method: "get",
        })
        response = await response.json();
       
        const email = response.email;
        let existingUser = await student.findOne({ Email: email });
        if (existingUser) {
            let token = jwt.sign({ _id: existingUser._id,role:existingUser.role }, process.env.JWT_SECRET);
            existingUser.Password=undefined;
            return res.status(200).send({user:existingUser,success: 1, jwtoken: token ,role:existingUser.role });
        }
        else{

        const name = response.name;
        const firstname = response.given_name;
        const lastName = response.family_name;
        const email = response.email;
        const picture = response.picture;
       
        let usercreated = new student({
            Name: name,
            Email: email,
            profile_pic:picture,
            acc_type:"google"
        });
        // console.log(req.body);

        let result = await usercreated.save();

        let token = jwt.sign({ _id: usercreated._id, role:usercreated.role }, process.env.JWT_SECRET);
        // res.cookie('jwtoken', token, {
        //     expires: new Date(Date.now() + 2592000),
        //     httpOnly: true
        // })
         usercreated.Password=undefined;
         result.Password=undefined;
        return res.status(200).send({ user:result, message: "User logged in successfully", success: 1, jwtoken: token });

        }
    }


    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.send({ error: "Fill the data" });
        }
        
        // const userLogin = await student.findOne({ Email: email });
        let userLogin=await checkrole(email);
        console.log(userLogin);

        if (userLogin===false) { return res.send({ message: "User doesn't Exist", success:0 }); }
        
        else {
            if(userLogin.acc_type=="google"){return res.send({success:0,message:"invalid creds"})}
            const isMatch = await bcrypt.compare(password, userLogin.Password);
            if (isMatch) {
                let token = jwt.sign({ _id: userLogin._id,role:userLogin.role }, process.env.JWT_SECRET);
                // res.cookie('jwtoken', token, {
                //     expires: new Date(Date.now() + 2592000),
                //     httpOnly: true
                // })
                userLogin.Password=undefined;
                return res.status(200).send({ user:userLogin, message: "User logged in successfully", success: 1, jwtoken: token,role:userLogin.role });
            }
            else {
                return res.send({ message: "Invalid Creds" });
            }
        }

    } catch (err) {
        console.log(err);
    }
})

router.post('/forgotpassword',async(req,res)=>{
    const email=req.body.email;
    const user=await checkrole(email);
    if(user===false){
        return res.send({success:0,message:"User doesnt exist"});
    }
    if(!user.Password){
        return res.send({success:0,message:"Log in using gmail"});
    }
    const secret=process.env.JWT_SECRET+user.Password;
    const payload={
        email:user.Email,
        id:user._id
    }
    const token=jwt.sign(payload,secret,{expiresIn:'10m'});
    const link=process.env.REACT_APP_FRONTEND_URL+`/resetpassword/${user.Email}/${token}`;

    let mailOptions = {
        from: "mustansirzain2@gmail.com",
        to: email,
        subject: 'Password Reset request',
        text: `Use the below link to reset the password (Note:The link will be active for 5 mins only)
        Link: ${link}
        `
    };
    transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
      return res.send({success:0,message:"Something went wrong"});
    } else {
      return res.send({success:1,message:"Email sent successfully"});
    }
  });
})



router.post('/resetpassword-token/:email/:token',async(req,res)=>{
    const email=req.params.email;
    const token=req.params.token;
    const Password=req.body.Password;


    const user=await checkrole(email);
    if(user===false){return res.send({success:0,message:"user dont exist"});}
    
    const secret=process.env.JWT_SECRET+user.Password;


    const verified = jwt.verify(token, secret, async(err, payload) => {
        if (err) {
            return res.status(400).send({success:0, message: "invalid token" });
        }
        else {
        console.log(payload)
        user.Password=Password;
        await user.save();
        return res.send({success:1,message:"Password changed successfully"})
        }
    })

    // try{
    //     const payload=jwt.verify(token,secret);
    //     console.log(payload)
    //     user.Password=Password;
    //     await user.save();
    // }
    // catch(err){
    //     console.log(err.message);
    //     res.send({success:0,message:err.message});
    // }

})


router.post('/resetpassword',middleware,async(req,res)=>{
    console.log(req.body);
    const email=req.body.email;
    const currentPassword=req.body.currentPassword;
    const newPassword=req.body.newPassword;

    let user=await checkrole(email);
    if(user===false){return res.send({success:0,message:"user dont exist"});}
    if(user.Password===undefined){return res.send({success:0,message:"Your account is being managed by google authentication"})}

    const isMatch = await bcrypt.compare(currentPassword, user.Password);
    if (isMatch) {
        user.Password=newPassword;
        await user.save();
        return res.send({success:1,message:"Password changed Succesfully"});

    }
    else {
        return res.send({ success:0, message: "Invalid Creds" });
    }



})
module.exports = router;