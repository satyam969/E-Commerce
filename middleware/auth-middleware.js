// to check if token is correct or not 
const jwt=require("jsonwebtoken");
const User=require("../models/user-model");

const authMiddleware=async(req,res,next)=>{

    const token =req.header('Authorization');

    if(!token){
        return res.status(401).json({message:"Unauthorised HTTP, Token not provided"})
    }

    const jwttoken =token.replace("Bearer","").trim();

    try {
        
const isVerified=jwt.verify(jwttoken,process.env.JWT_SECRET_KEY);

const UserData=await User.findOne({email:isVerified.email}).select({password:0});

// console.log(UserData);


// create custom propt further used in frontend
req.user=UserData;
req.token=token;
req.userID=UserData._id;


next();

    } catch (error) {
        console.log(error);
    }


}


// admin acess middleware 

const isAdmin=async(req,res,next)=>{

    try {
        // console.log("req->user",req.user.role);
        // isse bhi direct ho skta tha 


        const user=await User.findById(req.userID);

        if(user.role===1){

// admin
next();


        }
else{
   
   return res.status(401).send("You Are Not An Admin")
}


    } catch (error) {
        
        console.log("error in verifying admin",error);
res.status(401).send("Admin Authentication Not working")

    }




}











module.exports={authMiddleware,isAdmin};






