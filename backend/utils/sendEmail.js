const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

const sendEmail = asyncHandler(async (sent_from,sent_to,message_header,message_content) =>{
const transporter = nodemailer.createTransport({
    // host: process.env.EMAIL_HOST,
    // port: 587,
    service: 'gmail',
    auth:{
        user:process.env.USER_EMAIL ,
        pass:process.env.USER_PASS,
    },
    tls:{
        rejectUnauthorized:false,
    }
})
const options = {
    from: sent_from,
    to: sent_to,
   // replyTo: reply_to,
    subject: message_header,
    html: message_content,
  };

  transporter.sendMail(options , function(err,info){
    if(err)
    console.log(err);
    console.log(info);
  })
})
module.exports = sendEmail;