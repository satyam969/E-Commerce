const mongoose =require("mongoose");


const productSchema= new mongoose.Schema({
name:{type:String,required:true,},
slug:{
    type:String,
    required:true,
},
description:{type:String,
    required:true
},
price:{
    type:Number,required:true,
},
category:{
type:mongoose.ObjectId,
// /category model ke nam se relatinship ban rhe hai 
ref:"Category"
,required:true

}
,
quantity:{
    type:Number,
    required:true,
},
// photo by default wla nhi (cloud,aws me string milta ahi ) lekin yha miongo db me i store krkr kaam chlao\
// 10-16 mb only
photo:{
    data:Buffer,
    contentType:String,
},
shipping:{
   type:Boolean
}


},{timestamps:true})


const Product =new mongoose.model("Product",productSchema);


module.exports=Product;