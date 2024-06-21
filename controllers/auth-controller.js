const Order = require("../models/ordermodel");
const User = require("../models/user-model")
const bcrypt = require("bcryptjs")


const registercontroller = async (req, res) => {
    try {
        const { name, email, phone, password ,address,answer} = req.body;

        const userexist = await User.findOne({ email });

        if (userexist) {
            return res.status(400).send({ message: "User Already Exist" });
        }


        const newuser = await User.create({ name, email, phone, password,address,answer });

        res.status(201).send({ message: "User Created", name: newuser.name.toString() });



    } catch (error) {

        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }



}


const logincontroller = async (req, res) => {


    try {
        const { email, password } = req.body;

        const userExist =await User.findOne({ email });

        if (!userExist) {
            return res.status(400).send("User Doesnot Exist Procced To Register Page");
        }

        const user=await userExist.comparepassword(password);

       if(!user){

        return res.status(200).send({
            success: false,
            message: "Invalid Password",
          });

       }

        const token=await userExist.generateToken();




        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
              _id: userExist._id,
              name: userExist.name,
              email: userExist.email,
              phone: userExist.phone,
              address: userExist.address,
              role: userExist.role,
            },
            token,
          });


    } catch (error) {
        console.log(error);
    }






}


const forgotpassword=async(req,res)=>{


    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
          res.status(400).send({ message: "Emai is required" });
        }
        if (!answer) {
          res.status(400).send({ message: "answer is required" });
        }
        if (!newPassword) {
          res.status(400).send({ message: "New Password is required" });
        }
        //check
        const user = await User.findOne({ email, answer });
        //validation
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "Wrong Email Or Answer",
          });
        }

        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(newPassword, saltRound);

 await User.findByIdAndUpdate(user._id,{password:hash_password});
 res.status(200).send({
    success: true,
    message: "Password Reset Successfully",
  });
} catch (error) {
  console.log(error);
  res.status(500).send({
    success: false,
    message: "Something went wrong",
    error,
  });
}
}



const updateuser=async(req,res)=>{


  try {

      const {name, email,phone,address,password } = req.body;

      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if(!password || password.length<6){
        res.status(400).send({ message: "Emai is required" });

      }
   
      

      //check
      const user = await User.findOne( req.user._id );

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }

      //validation

const valid= await bcrypt.compare(password,user.password);

if(!valid){
  res.status(500).send({
    success:false,
  message:"Invalid Credentials"
  })
}
    



const updateduser=await User.findByIdAndUpdate(user._id,{name,phone,address},{new:true});
res.status(200).send({
  success: true,
  message: "Profile Updated Successfully",
  updateduser
});
} catch (error) {
console.log(error);
res.status(500).send({
  success: false,
  message: "Something went wrong",
  error,
});
}
}

const getorder=async(req,res)=>{
  try {

    // use id ke basis me get krnge 

    const id=req.user._id;


// sort ke andr o bhi likh rhe ho exact likhna without space { createdAt:"-1"} error dega 

const orders=await Order.find({buyer:id}).populate('products','-photo').populate('buyer','name').sort({createdAt:"-1"});

res.json(orders);

    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Error While Getting Orders",
      error
    })
  }
}


const getallorder=async(req,res)=>{
  try {

    // use id ke basis me get krnge 

// all orders 
const orders=await Order.find({}).populate('products','-photo').populate('buyer','name')

res.json(orders);

    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Error While Getting Orders",
      error
    })
  }
}



const orderstatus=async(req,res)=>{
try {
  
const {orderId}=req.params;
const {status}=req.body;

// upadtekrne pe new ka prop true krna pdta hai 

const orders=await Order.findByIdAndUpdate(orderId,{status},{new:true});

res.json(orders);


} catch (error) {
  console.log(error);
  res.status(500).send({
    success:false,
    message:"Error While changing status",
    error
  })
}




}




module.exports = { getorder,registercontroller, logincontroller ,forgotpassword,updateuser,getallorder,orderstatus};