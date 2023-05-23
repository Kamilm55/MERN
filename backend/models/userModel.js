const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add a name"]
    },
    email:{
        type:String,
        required:[true,"Please add an email"],
        unique: true,
        trim: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid emaial",
        ]
    },
    password:{
        type:String,
        required:[true,"Please add a password"],
        minLength:[6,"Password must be up to 6"]
    },
    photo: {
        image:Buffer,
        contentType: String,
        // default: "https://i.ibb.co/4pDNDk1/avatar.png",
      },
      phone: {
        type: String,
        default: "+994",
      },
      bio: {
        type: String,
        maxLength: [250, "Bio must not be more than 250 characters"],
        default: "Bio...",
      },
},
{
    timestamps:true
}
)
// Encrypt password before saving 
userSchema.pre("save",async function (next) {
  if(!this.isModified("password")){
    return next();// if we don't modified password   In this case, there is no need to re-encrypt the password, so the middleware function simply calls next() to pass control to the next middleware function in the stack.
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password,salt);
  this.password = hashedPassword; // we encrypt paswword
})

const User = mongoose.model("User",userSchema);
module.exports = User;