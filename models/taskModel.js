import mongoose from "mongoose"
import { Schema } from "mongoose"

const taskSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Task can't be blank"]
    },
    assignedBy: {
        type: Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'userModel',
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


export default mongoose.model("taskSchema",taskSchema);