import express  from "express";
import { addTask, deleteTask, getMyTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router()

router.post('/addTask', isAuthenticated , addTask)

router.get('/getMyTasks', isAuthenticated , getMyTask ) 

router.route('/:id').put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask)

export default router