import HandleError from '../middlewares/error.js'
import {Task} from '../models/Task.js'

export const addTask = async (req,res,next)=>{
    try {
        const {title, description} = req.body

    await Task.create({
        title,
        description,
        user: req.user,
    })

    res.status(201).json({
        succes:true,
        message: "Task Added Successfully!",
    })
    } catch (error) {
        next(error)
    }
}

export const getMyTask = async (req, res,next)=>{
    try {
        const userid = req.user._id

    const tasks = await Task.find({user:userid})

    res.status(200).json({
        success:true,
        tasks
    })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async(req,res, next)=>{
    try {
        const {id } = req.params
    
    const task = await Task.findById(id)

    if (task) {
        await task.deleteOne()
        res.status(200).json({
            success: true,
            message:"Task Deleted"
        })
    }
    // else{
    //     res.status(403).json({
    //         success: false,
    //         message:"Task Not Found"
    //     })
    // }

    next(new HandleError("Task Not Found",403))
    } catch (error) {
        next(error)
    }
}

export const updateTask = async(req,res,next)=>{
    try {
        const {id } = req.params
    
    const task = await Task.findById(id)

    if (task) {
        task.isCompleted = !task.isCompleted
        task.save()
    
        res.status(200).json({
            success: true,
            message:"Task Updated!"
        })
    }

    next(new HandleError("Task Not Found",403))

    } catch (error) {
        next(error)
    }
}

