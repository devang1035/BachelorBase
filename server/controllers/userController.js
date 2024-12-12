const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async(req,res)=>{

    const {name , email , password, role , contact } = req.body; //extract the information about user from body

    try{
        const UserExists = await User.findOne({email}); //check user exist or not in our db
        if(UserExists){
           return res.status(400).json({message:"user already exists !"});
        }
        const user = await User.create({name , email , password , role , contact});
        
        // Generate token upon registration
        const token = jwt.sign({ id:user._id ,  role:user.role}, process.env.JWT_SECRET, { expiresIn: '10000000' });

        user.save();
        return res.status(201).json({token});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "something went wrong !"});
    }
    
};

const loginUser = async(req,res)=>{

    const {email , password } = req.body;
    console.log(req.body);

try{

    // Check if email and password are provided
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ message: "Invalid email or password format" });
  }
    const user = await User.findOne({email});

    if(!user) return res.status(400).json({message:"User does not exist !"});

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return res.status(400).json({message:"password is not match !"});

    // Generate token upon login
    const token = jwt.sign({ id:user._id ,  role:user.role}, process.env.JWT_SECRET, { expiresIn: '10h' });
    console.log(token);
    console.log(user.role);

    return res.status(201).json({token});

}
catch(err){
    console.log(err);
    return res.status(500).json({email, password});
}
   
};

module.exports ={registerUser , loginUser};