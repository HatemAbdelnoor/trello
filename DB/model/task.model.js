import { Schema, Types,model } from "mongoose";

const taskSchema = new Schema({
    title: { type: String, required: true },
    description : { type: String, required: true },
    status: {
        type: String,
        default: "toDo",
        enum: ['toDo', 'doing','done'],
        require:true,
    },
    userId: {
        type: Types.ObjectId,
        ref:"User",
        require:'true'

       
    },

    assignTo:  {
        type: Types.ObjectId,
        ref:"User",
        require:'true'

       
    },
    deadline: String
  
}, { timestamps: true })

const taskModel = model("task", taskSchema)
export default taskModel;