const express = require("express");
const { getTasks, createTask, updateTask, deleteTask ,deleteAll, getOneTask} = require("../controllers/tasksController");
const router = express.Router();

router.get("/",getTasks);
router.get("/:taskId",getOneTask);
router.post("/createTask",createTask);
router.put("/updateTask/:taskId",updateTask);
router.delete("/deleteTask/:taskId",deleteTask);
router.delete("/deleteAll",deleteAll);

module.exports = router;