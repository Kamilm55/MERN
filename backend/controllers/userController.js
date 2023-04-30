const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn:"1d"});
}
const setTokenAndCookies = (user,req,res,regORlog) => {
    const token = generateToken(user._id);
    // save token via cookies
        res.cookie("token", token ,{
            path:"/",
            httpOnly:true,
            expires:new Date(Date.now() + 1000 * 86400), // it lasts 1 day
            sameSite:'none',
            secure:true
        })
       const {_id,photo,phone,bio} = user;
       if(user)
        res.status(regORlog === "register" ? 201 : 200).json({_id,email:user.email,name:user.name,photo,phone,bio,token})
        else{
            res.status(400);
            throw new Error("Invalid user data");
        }
}
///
const registerUser = asyncHandler(
    async(req,res) => {
        const {email , name , password} = req.body;
        if(!email || !name || !password ){
            res.status(400);
            throw new Error("Please fill all the required fields");
        }
    
        if(password.length < 6){
            res.status(400);
            throw new Error("Password length must be more than 6 characters ");
        }

        const userExists = await User.findOne({email:email});
        if(userExists){
            res.status(400);
            throw new Error("This email has already been registered");
        }
        // Create one
        const user = await User.create({name,email,password});
        setTokenAndCookies(user,req,res,"register");
   
}) 
const  loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please fill all the required field");
    }

    const user = await User.findOne({email:email});
    if(!user){
        res.status(400);
        throw new Error("User not found, you must sign up before login");
    }
    const passwordIsCorrect = await bcrypt.compare(password,user.password);
    if(!passwordIsCorrect){
        res.status(400);
        throw new Error("Your password is wrong");
    }

    if(user && passwordIsCorrect){
        setTokenAndCookies(user,req,res,"login");
    }


});
const logout = asyncHandler(async (req,res) => {
    res.cookie("token", "" ,{
        httpOnly:true,
        expires:new Date(0), 
        sameSite:'none',
        secure:true
    });
    res.status(200).json({message:"Succesfully logged out"});
})
const getUserdata = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id);

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
})
module.exports = {
    registerUser,
    loginUser,
    logout,
    getUserdata
}