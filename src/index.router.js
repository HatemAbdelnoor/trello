
import connectDB from '../DB/connection.js'
import userRouter from './modules/user/user.router.js'
import taskRouter from './modules/task/task.router.js'
import authRouter from './modules/auth/auth.router.js'
import { globalErrorHandling } from './modules/utils/errorHandling.js'
const bootstrap = (app, express) => {

    app.use(express.json())
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/task', taskRouter)
    app.use((error,req,res,next)=>{
        return res.json({message:error.message})
    })
    app.use("*", (req, res, next) => {
        return res.json({ message: "In-valid Routing" })
    })


    app.use(globalErrorHandling)
    connectDB()
}
export default bootstrap