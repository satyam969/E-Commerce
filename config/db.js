const mongoose =require("mongoose");
// const colors=require('colors');
const URL=process.env.MONGODBURL;



const ConnectDb=async()=>{
try {
    
    await mongoose.connect(URL);
    console.log("connection succesfull".bgMagenta);
} catch (error) {
    console.log("Database connection failed",error.bgRed);

    process.exit(0);
}





}

module.exports=ConnectDb;