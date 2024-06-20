import { Router } from "express";
import { Request,Response,NextFunction } from "express";
import Customer ,{ICustomer} from "../Models/Customer";
import multer ,{FileFilterCallback , StorageEngine} from "multer";
import path from 'path'
import {v4 as uuidv4 } from 'uuid'
import jwt from "jsonwebtoken";
import VerifyToken from "./TokenVerify";
import nodemailer from 'nodemailer'




const router = Router()



// SECTION-A FOR CUSTOMER CRUD OPERATION //

// ----------------------------------------------------------------------------------//
// --------------------------------------------------------------------------------- //

// register for the Customer 

interface register {
    firstname?:string | undefined,
    email?:string | undefined,
    password?:string | undefined,
    MobileNumber?:string | undefined
    code?:string
}

// for the user upload profile save in folder using multer

// Define storage for multer
const storage: StorageEngine = multer.diskStorage({
    destination: 'Customers',
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void): void => {
      const unifix = uuidv4();
      const fileExtension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + unifix + fileExtension);
    }
  });
  
  // Define file filter function
//   const filter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback ): void => {
//     const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Profile Type Only JPG, PNG, JPEG Allow Only'), false);
//     }
//   };
  
  // Configure multer with storage and file filter
  const upload = multer({ storage: storage });
  

//multer 




//sending the mail 
const VerificationMail = async(email:string , code :string) =>{
    const transpoter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"talariramcharan33@gmail.com",   //your email id
            pass:"nhht kbcs ielf xorp"    // your app passcode
        }
    
    })

    const mailoption ={
        from:"talariramcharan33@gmail.com",
        to:email,
        subject:"Verify your Mail",
        text:`Your Verification Code is ${code}`
    }

    try{
        await transpoter.sendMail(mailoption)

    }catch(error){
        console.log(error)
    }
}


//api for the customer register 
router.post('/register',upload.single('Profile'),async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,password,firstname,MobileNumber} : register = req.body

        const User = await Customer.findOne({email:email})
        if(User){
            return res.status(400).json({
                success:false,
                message:"Email Already Exict"
            })
        }
        const NewCustomer = new Customer({
            email:email,
            password:password,
            firstname:firstname,
            MobileNumber:MobileNumber,
            Profile:req.file?.filename
        })
        NewCustomer.generateVerificationCode()
        await NewCustomer.save()
        
        await VerificationMail(email as string ,NewCustomer.verificationCode as string)

        if(NewCustomer){
            console.log(NewCustomer)
            return res.status(201).json({
                success:true,
                message:"Register Successfully, please verify your email",
                NewCustomer:NewCustomer
            })
        }
        
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})


//router for verify the email
router.post('/verify',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email , code} : register  = req.body

        const User = await Customer.findOne({email:email})
        if(!User){
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }
        console.log(User.verificationCode ,"verification code")
        console.log(code,"frontend code")
        const currentDate = new Date().getTime();
        const verificationCodeExpires = User.verificationCodeExpires?.getTime()  || 0;
        console.log(verificationCodeExpires,"getting verification time")
        if (User.verificationCode !== code) {
            return res.status(400).json({
                success: false,
                message: "Invalid  verification code"
            });
        }else if(verificationCodeExpires < currentDate){
            return res.status(400).json({
                success: false,
                message: "expire  verification code"
            });
        }
        User.isVerified = true;
        User.verificationCode = undefined;
        User.verificationCodeExpires = undefined;
        await User.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})


//router resend mail
router.post('/resend',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email} : register = req.body
         console.log(email,"getting email")
        const User = await Customer.findOne({email:email})
        if(!User){
             return res.status(404).json({
                success:false,
                message:"Customer Not found "
             })
        }

        if(User.isVerified){
            return res.status(400).json({
                success:false,
                message:"Email Already Verified"
             })
        }
       User.generateVerificationCode()
        await User.save()
        await VerificationMail(email as string ,User.verificationCode as string )

        return res.status(200).json({
            success: true,
            message: "Verification code resent successfully"
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})



// //login
router.post('/login',async(req:Request,res:Response,next:NextFunction)=>{
     try{
        const {email,password} : register = req.body;
        
        const Customers = await Customer.findOne({email:email});
        if(!Customers){
            return res.status(404).json({
                success:false,
                message:"Invalid email"
            })
        }
        if(Customers?.password !== password){
            return res.status(404).json({
                success:false,
                message:"Incorrect password"
            })
        }else{
            const tokenemail = Customers.email
            const token = jwt.sign({email:tokenemail} , "HardikHardik" , {expiresIn:"1h"})
            res.cookie(  "token",token , {httpOnly:false})
            return res.status(200).json({
                success:true,
                message:"Login Successfully",
                Customers:Customers
            })
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
});


//get the profile
router.get('/profile/:id',VerifyToken,async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const id :string = req.params.id as string;
        try{
            const Customers =await Customer.findById(id)
            if(!Customers){
                return res.status(404).json({
                    success:false,
                    message:"no customer found with this id"
                })
            }else{
                return res.status(200).json({
                    success:true,
                    message:"Profile",
                    Customer:Customers
                })
            }
        }catch(error){
            console.log(error)
            return res.status(500).json({
                suucess:false,
                message:"internal server error"
            })
        }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
});


//update the profile
router.put('/profile/:id',VerifyToken,upload.single('Profile'),async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const id : string = req.params.id as string;
        const {email,password,firstname,MobileNumber} : register = req.body
        const Customers = await Customer.findById(id)
        if(!Customers){
            return res.status(404).json({
                success:false,
                message:"internal server error"
            })
        }
        const Newcustomer = await Customer.findByIdAndUpdate(id,{
            firstname:firstname,
            email:email,
            password:password,
            MobileNumber:MobileNumber,
            Profile:req.file?.filename
        },{new:true});

        if(Newcustomer){
            return res.status(201).json({
                success:true,
                message:"Update Successfully"
            })
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
});


router.delete('/profile/:id',async(req:Request,res:Response,next:NextFunction)=>{
    const id : string = req.params.id as string
    try{
        const Customers = await Customer.findById(id)
        if(!Customers){
            return res.status(404).json({
                success:false,
                message:"No Customer Found With This Id"
            })
        }else{
            const DeleteCustomer = await Customer.findByIdAndDelete(id)
            if(DeleteCustomer){
                return res.status(200).json({
                    success:true,
                    message:"Delete Successfully"
                })
            }
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
})






export default router