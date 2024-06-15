const User = require("../models/User");
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

exports.registerUser = async (req, res) => {
  try {
    const { name, gender, email, password, description } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ name, gender, email, password, description });
    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};



exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.signUpUser = async (req, res) => {

  console.log(req.body);
    let usercreated = new User({
        name: req.body.Name,
        email: req.body.Email,
        password:req.body.Password
    });
    console.log(req.body);

    let result = await usercreated.save();

    let token = jwt.sign({ _id: usercreated._id }, process.env.JWT_SECRET);


    return res.status(200).send({ user:result, message: "User logged in successfully", success: 1, jwtoken: token });
  }


exports.UserLogin=async(req,res)=>{

  try {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.send({ error: "Fill the data" });
    }
    
    // const userLogin = await student.findOne({ Email: email });
    let userLogin=await User.findOne({email});
    console.log(userLogin);

    if (!userLogin) { return res.send({ message: "User doesn't Exist", success:0 }); }
    
    else {
       
        const isMatch = await bcrypt.compare(password, userLogin.password);
        if (isMatch) {
            let token = jwt.sign({ _id: userLogin._id }, process.env.JWT_SECRET);

            
            return res.status(200).send({ user:userLogin, message: "User logged in successfully", success: 1, jwtoken: token,role:userLogin.role });
        }
        else {
            return res.send({ message: "Invalid Creds" });
        }
    }

} catch (err) {
    console.log(err);
}


}