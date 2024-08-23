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
        const tasks=await taskModel.find({assignedTo:req.params.id}).populate('assignedBy', 'name').populate('assignedTo', 'name');
        return res.status(201).send({
            success:true,
            message:"Welcome to MAK Notes",
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
        const tasks=await taskModel.find({assignedBy:req.params.id}).populate('assignedBy', 'name').populate('assignedTo', 'name');
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

export const updateTask=async(req,res)=>{
    try {
        const{name,selected,dueDate}=req.body
        const {id}=req.params
        const data=await taskModel.findByIdAndUpdate(id,{name:name,assignedTo:selected,dueDate:dueDate},{new:true})
        return res.status(201).send({
            success:true,
            message:"Task Updated Successfully",
            data
        })
    } catch (error) {
        return res.status(400).send({
            success:false,
            message:"Error in updating the tasks",
            error
        })
    }
}

export const deleteTask=async(req,res)=>{
    try {
        const {id}=req.params
        const data=await taskModel.findByIdAndDelete(id)
        return res.status(201).send({
            success:true,
            message:"Task Deleted Successfully"
        })
    } catch (error) {
        return res.status(400).send({
            success:false,
            message:"Error in deleting the tasks",
            error
        })
    }
}

export const completeTask = async (req, res) => {
    try{
    const {id} = req.params;
    const task = await taskModel.findById(id);
    const {userId} = req.body
    let flag=0;

    if (!task) {
      return res.status(404).send('Task not found');
    }
  
    if (!task.completedBy.includes(userId)) {
      task.completedBy.push(userId);
      const task_update=await taskModel.findByIdAndUpdate(id,{$pull:{assignedTo:userId}},{new:true})
      if (task_update){
      flag=1;
    }
    }

    const allUsersCompleted = task.assignedTo.every(userId =>
      task.completedBy.includes(userId)
    );
  
    if (allUsersCompleted) {
      await taskModel.findByIdAndDelete(id);
      return res.status(200).send({
        success:true,
        message:'Task completed by all users and deleted',
    })
    }

    await task.save();
    if(flag===1){
    return res.status(200).send({
        success:true,
        message:'Marked as completed 🥳🥳'
    });
    }
}catch(error){
    console.log(error)
    return res.status(400).send({
        success:false,
    })
}
};