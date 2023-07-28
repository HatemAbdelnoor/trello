import { asyncHandler } from '../utils/errorHandling.js';
import * as taskController from './controller/task.js'
import { Router } from "express";
const router = Router()
router.get('/', taskController.getTasks )
router.post('/', taskController.newTask )
router.delete('/', taskController.deletetask)
router.put('/', taskController.updatetask)
router.get('/getTasksById', taskController.getTasksById)
router.get('/getTasksByIdWithData', taskController.getTasksByIdWithData)


export default router