const asyncHandler = require("express-async-handler");
const Tasks = require("../models/tasksModel");

const getTasks = asyncHandler(async (req,res)=>{
    const {_id} = req.user;
    const allTasks = await Tasks.find({UserId:_id});

    if(allTasks){
        res.status(200).json(allTasks);
    }else{
        res.status(400);
        throw new Error("Tasks are not found");
    }
});
const getOneTask = asyncHandler(async(req,res)=>{
    const {taskId} = req.params;
    const selectedTask = await Tasks.findById(taskId);
    if(!selectedTask){
        res.status(400);
        throw new Error("There is no such task with this id");
    }
    res.status(200).json(selectedTask);
});
const createTask = asyncHandler(async (req,res)=>{
    const {name,priority,type,timelineStart,timelineEnd,taskDescription,bugs} = req.body;
    const {_id} = req.user;

    if(!name || !type){
        res.status(400);
        throw new Error("You must field all required fields (*)");
    };

    if((!timelineEnd && timelineStart) || (timelineEnd && !timelineStart) ){
        res.status(400);
        throw new Error("You must BOTH timelineEnd && timelineStart");
    }

    const createdTask = await Tasks.create({name,priority,type,timelineStart,timelineEnd,taskDescription,bugs,UserId:_id});

    if(createdTask){
        res.status(201).json(createdTask);
    }else{
        res.status(400);
        throw new Error("Tasks cannot created");
    }
});
const updateTask = asyncHandler(async (req,res)=>{
    const {taskId} = req.params;
    const {name,priority,type,isCompleted,timelineStart,timelineEnd,taskDescription,bugs} = req.body;

    if((!timelineEnd && timelineStart) || (timelineEnd && !timelineStart) ){
        res.status(400);
        throw new Error("You must BOTH timelineEnd && timelineStart");
    }

    const selectedTask = await Tasks.findById(taskId);
    if(!selectedTask){
        res.status(400);
        throw new Error("There is no such task with this id");
    }

    selectedTask.name = name  || selectedTask.name;
    selectedTask.priority = priority  || selectedTask.priority;
    selectedTask.type = type  || selectedTask.type;
    selectedTask.timelineStart = timelineStart  || selectedTask.timelineStart;
    selectedTask.timelineEnd = timelineEnd  || selectedTask.timelineEnd;
    selectedTask.taskDescription = taskDescription  || selectedTask.taskDescription;
    selectedTask.bugs = bugs  || selectedTask.bugs;
    selectedTask.isCompleted = isCompleted  || selectedTask.isCompleted;
    await selectedTask.save();

    res.status(200).json(selectedTask);
});
const deleteTask = asyncHandler(async (req,res)=>{
    const {taskId} = req.params;

    const deleteTask = await Tasks.findByIdAndDelete(taskId);
    if(deleteTask){
        res.status(200).json("deleted succesfully");
    }else{
        res.status(400);
        throw new Error("Task cannot deleted");
    }
});
const deleteAll = asyncHandler(async (req,res)=>{
    const {_id} = req.user;
    const deleteAllTasks = await Tasks.deleteMany({UserId:_id});

    if(deleteAllTasks){
        res.status(200).json("All tasks are deleted");
    }else{
        res.status(400);
        throw new Error("All tasks cannot be deleted");
    }
});
module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    deleteAll,
    getOneTask
}