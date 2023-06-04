const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const Token = require('../models/tokenModel');
const sendEmail = require('../utils/sendEmail');
const crypto = require("crypto");

const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn:"1d"});
}
const setTokenAndCookies = (user,req,res,regORlog) => {
    const token = generateToken(user._id);
    // save token via cookies
        res.cookie("token", token ,{
            path:"/",
            httpOnly:false,
            expires:new Date(Date.now() + 1000 * 86400), // it lasts 1 day
            // sameSite:'none',
            secure:process.env.NODE_ENV === 'development' ? false : true
        })

        const {_id,photo,phone,bio} = user;
       if(user)
        res.status(regORlog === "register" ? 201 : 200).json({_id,email:user.email,name:user.name,photo,phone,bio,token})
        else{
            res.status(400);
            throw new Error("Invalid user data");
        }
}
///////////////////////////////////////////////////////////////////////////////////////////
const registerUser = asyncHandler(async(req,res) => {
        const {email , name , password , bio , phone} = req.body;

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

        // change image for storing 
        let final_img ;
        if(req.file){
            final_img = req.file.filename
            //if req.file does not exist final img is undefined and model runs default function
        }

        // Create one
        const user = await User.create({name,email,password,photo:final_img,bio,phone});
        setTokenAndCookies(user,req,res,"register");
   
}) ;
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
        path:"/",
        httpOnly:false,
        expires:new Date(0), 
        // sameSite:'none',
        secure:process.env.NODE_ENV === 'development' ? false : true
    });
    res.status(200).json({message:"Succesfully logged out"});
});
const loginStatus = asyncHandler(async (req,res) =>{
    const {token} = req.cookies;

    if(!token)
    res.status(400).json(false);

    const verified = jwt.verify(token,process.env.JWT_SECRET);
    if(verified)
    res.status(200).json(true);
    else
    res.status(400).json(false);
});
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
});
const updateUser = asyncHandler(async (req,res) => {
const user = await User.findById(req.user._id);

if(!user){
    res.status(400);
    throw new Error("You must authorize before update");
}
user.email = req.body.email || user.email;
user.name = req.body.name || user.name;
user.bio = req.body.bio || user.bio;

  if(req.file){
    const  final_img = req.file.filename;
    user.photo = final_img || user.photo;
 }

user.phone = req.body.phone || user.phone;

const updatedUser = await user.save();//User signed as an all database , but i declared user as one of them
if(updatedUser){
    const {_id,email,name,bio,photo,phone} = updatedUser;
    res.json({_id,email,name,bio,photo,phone});
}
else{
    res.status(400);
    throw new Error("User cannot update");
}
});
const changePassword = asyncHandler(async (req,res) => {
const user = await User.findById(req.user._id);

if(!user){
    res.status(400);
    throw new Error("You must authorize before update");
}
const {oldPassword,newPassword,confirmedPassword} = req.body;
if(!oldPassword || !newPassword || !confirmedPassword){
    res.status(400);
    throw new Error("You must fill every field");
}
if(newPassword !== confirmedPassword){
    res.status(400);
    throw new Error("Confirm password again");
}
//I should check if this oldPassword is the same in mongoDB specific user
const isPasswordCorrect = await bcrypt.compare(oldPassword,user.password);
if(user && isPasswordCorrect){
    user.password = newPassword;
    await user.save();
    res.status(200).json("Password changed succesfully")
}
else{
    res.status(400);
    throw new Error("Your old password is incorrect");
}
});
const forgotPassword = asyncHandler(async (req,res) => {
    const {email} = req.body;
    if(!email){
        res.status(400);
        throw new Error("You must fill email field");
    }

    const user = await User.findOne({email});
    if(!user){
        res.status(400);
        throw new Error("There is no authenticated user with this email");
    }
    const token = await Token.findOne({userId:user._id});//if this user has token delete it

    if(token)
    await token.deleteOne();

    // create new token for 30 minutes and hash it and save to DB with user ref

   const resetToken = crypto.randomBytes(32).toString("hex") + user._id;//show client  non hashed format   
   const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex"); //save in DB hashed format

   await new Token({
    userId:user._id ,
    token:hashedToken ,
    createdAt: Date.now(),
    expiresAt:Date.now() + 30 * (60 * 1000) //30 minutes
   }).save();

    const sent_from = 'The Bug tracker app' ;
    const sent_to = email;
    const message_header = "Reset your password";
    const message_content = `<div>
    <h2>Hi!</h2>
    <p>Your link for resetting password</p>
    <p>This link is available for 30 minutes</p>
    <a href=${process.env.FRONTEND_URL}/resetPassword/${resetToken}>${process.env.FRONTEND_URL}/resetPassword/${resetToken}</a>
    </div>`
    try {
         sendEmail(sent_from,sent_to,message_header,message_content);
         res.status(200).json({message:"You can check your gmail.We send you link for reset password"});
    } catch (e) {
        res.status(500);
        throw new Error(e);
    }
});
const resetPassword = asyncHandler(async (req,res) => {
const {resetToken} = req.params;
const {newPassword} = req.body;
// I show client  non hashed format
const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
const isExistHashedToken = await Token.findOne({
    token:hashedToken,
    expiresAt: { $gt: Date.now() }// greater than date.now
})

if(!isExistHashedToken){
    res.status(400);
    throw new Error("Your link is wrong or terminated")
}else{

    const user = await User.findOne({_id:isExistHashedToken.userId});
    if(user){
       user.password = newPassword;//it encrypts bedore saving db with pre function in model
       await user.save();
       res.status(200).json("Your password is changed succesfully");
    }else
    res.status(400);
}

});
module.exports = {
    registerUser,
    loginUser,
    logout,
    getUserdata,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword
}