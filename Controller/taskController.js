import taskModel from '../models/taskModel.js'

export const createTask=async(req,res)=>{
    try {
        const {name,date,select}=req.body
        const {id}=req.params
        if(!name){
            return res.status(400).send({message:"Title name is required"})
        }
        if(!date){
            return res.status(404).send({message:"Due Date is important"})
        }
        if(!select){
            return res.status(400).send({message:"At least one Candidate is required"})
        }
        const task= new taskModel({name:name,dueDate:date,assignedBy:id,assignedTo:select}).save()
        return res.status(201).send({
            success:true,
            message:"Task created Successfully",
            task
        })

    } catch (error) {
        return res.status(404).send({
            success:false,
            message:"Error in creating task",
            error
        })
    }
}

export const getbyUserId=async(req,res)=>{
    try {
        const tasks=await taskModel.find({assignedTo:req.params.id})
        return res.status(201).send({
            success:true,
            message:"User-Task",
            tasks
        })
    } catch (error) {
        return res.status(400).send({
            success:false,
            message:"Error in getting the tasks",
            error
        })
    }
}

export const getUsercreatedTask=async(req,res)=>{
    try {
        const tasks=await taskModel.find({assignedBy:req.params.id}).populate('name')
        return res.status(201).send({
            success:true,
            message:"Getting Task List",
            tasks
        })
        
    } catch (error) {
        return res.status(400).send({
            success:false,
            message:"Error in getting the tasks",
            error
        })
    }
}