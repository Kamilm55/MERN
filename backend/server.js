const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require('./routes/userRoute');
const tasksRoute = require('./routes/tasksRoute');
const sprintsRoute = require('./routes/sprintsRoute');
const bugsRoute = require('./routes/bugsRoute');
const errorHandler = require('./middleware/errorMiddleware');
const protect = require('./middleware/authMiddleware');

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//CORS
app.use(
  cors({
    origin: ["http://localhost:3000"/* , "https://bug-tracker-app.vercel.app" */],
    credentials: true,
  })
);

// Routes Middleware
app.use("/api/users",userRoute);/// AUTH functions and personal information of each user
app.use("/api/users/tasks",protect,tasksRoute); // the tasks of specific user
app.use("/api/users/sprints",sprintsRoute);//sprints
app.use("/api/users/bugs",bugsRoute);//bug queues
/// + kanban features

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


