import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName: { type: String, required: true,  lowercase: true},
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    age: Number,
    gender: {
        type: String,
        default: "male",
        lowercase: true,

        enum: ['male', 'female']
    },
    confirmEmail:{
        type:Boolean,
        default: false,
    }   ,
    isDelted:{
        type:Boolean,
        default: false,
    }   ,
    isOnline:{
        type:Boolean,
        default: false,
    }   ,
     
    phone: String,
  
}, { timestamps: true })

const userModel = model("User", userSchema)
export default userModel;