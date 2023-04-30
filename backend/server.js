const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require('./routes/userRoute');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
// Routes Middleware
app.use("/api/users",userRoute);

// Routes
app.get("/" , (req,res)=>{
  res.send("It is home page")
})

//Error Middleware
app.use(errorHandler);
// Connect to DB and start server
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT} and connected to DB`);
    });
  })
  .catch((err) => console.log(err));


