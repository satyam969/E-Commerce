const mongoose=require("mongoose");

const categorySchema =new mongoose.Schema({

name:{
    type:String,
    required:true,
    unique:true
},
// slugify ki mdd se slug bna denge space ke jgah _or -
// like category ka anm hai best smartwatch toh url me toh 
// space nhi aa skta toh usko slugify krna hoga 
// tbhi toh us particular pe hm products add kr skte hai
slug:{
    type:String,
    lowercase:true
}
})



const Category=new mongoose.model("Category",categorySchema);
module.exports=Category;