// sprintler olacaq array of objects
// her sprint objectdir
// her sprintin bu ozellikleri olacaq
// task status priority type timeline taskDescription(optional) bugs itemID 
const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema({
        UserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"user"
        },
        name:{
            type:String,
            required:[true,"Please add a name"]
        },
        priority:{
            type:String,
            default:"Ready to start"
        },
        type:{
            type:String,
            required:[true,"Please add a type"]
        },
        timelineStart:{
            type:Date
        },
        timelineEnd:{
            type:Date
        },
        taskDescription:{
            type:String
        },
        bugs:{
            type:String
        },
    }
,
{
    timestamps:true
});

tasksSchema.pre("save",async function (next) {
 
    if(this.timelineEnd && this.timelineStart){
        this.timelineEnd = new Date(this.timelineEnd).toISOString();
        this.timelineStart = new Date(this.timelineStart).toISOString();
    }

    next()
})

const Tasks = mongoose.model("Tasks",tasksSchema);
module.exports = Tasks;
