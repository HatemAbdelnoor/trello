import jwt from 'jsonwebtoken';
import userModel from '../../DB/model/User.model.js';
import { asyncHandler } from '../modules/utils/errorHandling.js';


export const auth= asyncHandler( async(req,res,next)=>{
const {authorization}=req.headers;
if(!authorization?.startsWith(process.env.BEARERTOKEN)){
    return next(new Error("Invalid authorization or bearerkey"));
}

  const token = authorization.split(process.env.BEARERTOKEN)[1]

  const  decoded=jwt.verify(token, process.env.TOKEN_SIGNATURE)

if (!decoded?.userid)
{
    return res.json({message: 'Invalid token payload'});
}
const user=await userModel.findById(decoded.userid);

if (!user)
{
    return res.json({message: 'not reqister user'});

}
req.user=user;

return next();

});
