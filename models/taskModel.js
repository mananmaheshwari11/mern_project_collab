import mongoose from "mongoose"
import { Schema } from "mongoose"
//import User from "userModel.js"

const taskSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Task can't be blank"]
    },
    assignedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true,"Task needs to be assigned to atleast one candidate"]
    },
    createdAt:{
        type : Date,
        default : Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
})


const Task = mongoose.model('Task', taskSchema);
module.exports = Task;