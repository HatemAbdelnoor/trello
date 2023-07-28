

import   Jwt  from "jsonwebtoken";
import userModel from "../../../../DB/model/User.model.js";
import bcrypt from 'bcryptjs'
import nodemailer  from "nodemailer"
import { asyncHandler } from "../../utils/errorHandling.js";
import sendEmail from './../../utils/email.js';
import  * as validators  from "../validation.js";
export const signup =  asyncHandler(

    async (req, res, next) => {

   
        const { userName , email , age ,gender ,phone ,password ,cPassword} = req.body
       
        const validationResult =validators.signup.validate(req.body,{abortEarly:false});

        if(validationResult.error){
            return res.json({message:"validation error", validationResult})

        }

        const checkUser = await userModel.findOne({ email }) 
        if (checkUser) {
            return next(new Error("Email Exist") )
        }
        
        const hashPassword = bcrypt.hashSync(password, +process.env.SALT_ROUND)
        const user = await userModel.create({userName , email , age ,gender ,phone , password: hashPassword })
       
       
       const token=Jwt.sign({id:user._id,email:user.email},process.env.Email_SIGNATURE ,{expiresIn:"15m"})
        const link =`http://localhost:5000/auth/confirmEmail/${token}`
        const unsubscribe =`http://localhost:5000/auth/unsubscribe/${token}`
        await sendEmail({to:email, subject:"conirmEmail",html:`<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <style type="text/css">
                @media screen {
                    @font-face {
                        font-family: 'Lato';
                        font-style: normal;
                        font-weight: 400;
                        src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: normal;
                        font-weight: 700;
                        src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: italic;
                        font-weight: 400;
                        src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: italic;
                        font-weight: 700;
                        src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                    }
                }
        
                /* CLIENT-SPECIFIC STYLES */
                body,
                table,
                td,
                a {
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
        
                table,
                td {
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
        
                img {
                    -ms-interpolation-mode: bicubic;
                }
        
                /* RESET STYLES */
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                }
        
                table {
                    border-collapse: collapse !important;
                }
        
                body {
                    height: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100% !important;
                }
        
                /* iOS BLUE LINKS */
                a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                }
        
                /* MOBILE STYLES */
                @media screen and (max-width:600px) {
                    h1 {
                        font-size: 32px !important;
                        line-height: 32px !important;
                    }
                }
        
                /* ANDROID CENTER FIX */
                div[style*="margin: 16px 0;"] {
                    margin: 0 !important;
                }
            </style>
        </head>
        
        <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->import { signup } from './../../utils/validation';
import { signup } from './auth';

            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="#FFA73B" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href=${link} target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirm Account</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="border-radius: 3px;" bgcolor="#ff0000"><a href="${unsubscribe}"} target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">unsubscribe</a></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                                </td>
                    
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">If these emails get annoying, please feel free to <a href= target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>`})
        return res.json({ message: "Done", user })
});
    export const confirmEmail= asyncHandler( async(req,res,next) => {
            const {token}=req.params;
            console.log({token});
            const decoded=Jwt.verify(token,process.env.Email_SIGNATURE)

              console.log({decoded});
              const user = await userModel.findByIdAndUpdate(decoded.id,{confirmEmail:true})
              return user? res.json({message:"done"})
              : next(new Error("not register account"));




         }) 


         export const unsubscribe= asyncHandler(async(req, res, next)=>
        {
            
            const {token}=req.params;
            console.log({token});
            const decoded=Jwt.verify(token,process.env.Email_SIGNATURE)

              console.log({decoded});
              const user = await userModel.findByIdAndDelete(decoded.id,{confirmEmail:true})
              return user? res.json({message:"done"})
              : next(new Error("not register account"));



        })
export const login =  asyncHandler( 
async (req, res, next) => {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ message: "In-valid email" })
        }
        const states= user.isDelted
        if (states==true) {
            return res.json({ message: "regist with ohter email" })
        }
     
        console.log({states:user.isDelted});
        console.log({ FE: password });
        const match = bcrypt.compareSync(password, user.password)
        console.log({ match });
        if (!match) {
            return res.json({ message: "In-valid login data" })
        }
         const userlogin =await userModel.updateOne({email},{isOnline:true});
        const token =Jwt.sign({userid:user._id ,pass: user.password,logedin:true}, process.env.TOKEN_SIGNATURE,{expiresIn:"1h"} )
        return res.json({ message: "Done", token,userlogin})
  

        
  
})
export const logout=asyncHandler(async( req, res, next)=>{

        const decoded= Jwt.verify( req.headers.usertoken , process.env.TOKEN_SIGNATURE)
        const userId = await decoded.userid

         const isonline = await decoded.logedin
   if (isonline ==false) {
        return next(new Error("  you logout before ") )
       }
       const user =await userModel.updateOne({_id:userId},{isOnline:false});
        return res.json({ message: "Done" ,user})

     





})
 
export const softDeleteUser = asyncHandler( async (req, res) => {

        const decoded= Jwt.verify( req.headers.usertoken , process.env.TOKEN_SIGNATURE)
        const userId = await decoded.userid

         const isonline = await decoded.logedin
   if (isonline ==false) {
        return next(new Error("  you must login ") )
       }
       const user =await userModel.updateOne({_id:userId},{isDelted:true});
        return res.json({ message: "Done" ,user})

     
});

export const deleteUser = asyncHandler( async (req, res) => {

    const decoded= Jwt.verify( req.headers.usertoken , process.env.TOKEN_SIGNATURE)
    const userId = await decoded.userid

     const isonline = await decoded.logedin
if (isonline ==false) {
    return next(new Error("  you must login ") )
   }

    const  user = await userModel.findByIdAndDelete({_id:userId} )


    return res.json({ message: "Done", user }) ;
 
});
export const updatePassword= asyncHandler( async (req, res) => {
    
        const{usertoken} =req.headers
        const{oldPassword,newPassword}=req.body
        

        const decoded= Jwt.verify( req.headers.usertoken , process.env.TOKEN_SIGNATURE)

        const userId = await decoded.userid
         const HashDBPassword=await decoded.pass
         const isonline = await decoded.logedin
   if (isonline ==false) {
        return next(new Error("  you must login ") )
       }
       const match = bcrypt.compareSync(oldPassword, HashDBPassword)
       if (!match) {
        return res.json({ message: "password not match" })
        
    }
    const hashPassword = bcrypt.hashSync(newPassword, +process.env.SALT_ROUND)
        const user =await userModel.updateOne({_id:userId},{password:newPassword});
        return res.json({ message: "Done" ,user})

})

