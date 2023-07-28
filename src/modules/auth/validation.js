
import  joi  from 'joi';

export const signup = joi.object({
    userName: joi.string().min(3).max(10).required(),
    email:joi.string().email().required(),   
    age:joi.number().integer().positive().required() ,
    gender: joi.string().required(),
    phone: joi.number().required() ,
    password:joi.string().min(5).required(),
    cPassword:joi.string().valid(joi.ref("password")).required(),
}).required();