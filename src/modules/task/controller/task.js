import taskModel from '../../../../DB/model/task.model.js';
import { asyncHandler } from './../../utils/errorHandling.js';
import userModel from '../../../../DB/model/User.model.js';
import Jwt  from 'jsonwebtoken';
export const getTasks =  asyncHandler(async (req, res) => {
    const tasks = await taskModel.find().populate([

        {
            path: 'userId',
            path:"assignTo"
        }
            
            ])
            
        
    return res.json({ message: "Done"  , tasks})
});
export const newTask =  asyncHandler(

    async (req, res, next) => {
        

   
        const { title , description , status  ,assignTo ,deadline } = req.body

        const decoded=   Jwt.verify( req.headers.tasktoken , "thatsmytopsecrettoken")


        const userId = await decoded.userid


         const isonline = await decoded.logedin
   if (isonline ==false) {
        return next(new Error("  you must login ") )
       }
       console.log({ title , description , status  ,assignTo ,deadline ,decoded })

   const task = await taskModel.create({ title , description , status ,userId:decoded.userid ,assignTo ,deadline })

        return res.json({ message: "Done", task })
});
export const deletetask = asyncHandler( async (req, res) => {
    const {tasktoken}=req.headers

        const decoded=   Jwt.verify( req.headers.tasktoken , "thatsmytopsecrettoken")


        const userId = await decoded.userid


         const isonline = await decoded.logedin
   if (isonline ==false) {
        return next(new Error("  you must login ") )
       }
   
        const {title } = req.body
        const  task = await taskModel.deleteOne({title},{userId} )

        return res.json({ message: "Done", task })
     
});
export const updatetask = asyncHandler( async (req, res) => {

   
        const {title , description , status} = req.body
    
        
        const decoded=   Jwt.verify( req.headers.tasktoken , "thatsmytopsecrettoken")


        const id = await decoded.userid


         const isonline = await decoded.logedin
   if (isonline ==false) {
        return next(new Error("  you must login ") )
       }      

        
         const task = await taskModel.updateMany({ userId : id },{title , description , status})
        console.log({title , description ,id ,status})


        return res.json({ message: "updated" ,task})
    });

    export const getTasksById =  asyncHandler( async (req, res) => {

        const {tasktoken}=req.headers

        const decoded=   Jwt.verify( req.headers.tasktoken , "thatsmytopsecrettoken")


        const Id = await decoded.userid


         const isonline = await decoded.logedin
   if (isonline ==false) {
        return next(new Error("  you must login ") )
       }
        const tasks = await taskModel.findOne({userId:Id})
        return res.json({ message: "Done"  , tasks:tasks})

    });

    export const getTasksByIdWithData =  asyncHandler( async (req, res) => {

        const {tasktoken}=req.headers

        const decoded=   Jwt.verify( req.headers.tasktoken , "thatsmytopsecrettoken")


        const Id = await decoded.userid


         const isonline = await decoded.logedin
   if (isonline ==false) {
        return next(new Error("  you must login ") )
       }
       const userifo=await userModel.findById({_id:Id})

        const tasks = await taskModel.findOne({userId:Id})
        return res.json({ message: "Done"  , tasks , userifo})

    });
