const mongoose=require("mongoose")


const orderSchema=new mongoose.Schema({
 
    // /products jiska order place ho gya hai 
    products:[{type:mongoose.ObjectId,
        ref:'Product',
    }]
     ,
     payment:{},
    //  kisne buy kiya hai
     buyer:{
        type:mongoose.ObjectId,
        ref:'users'
     },
     status:{
        type:String,
        default:"Not Processed",
        enum:["Not Processed","Processing","Shipped","Delivered","Cancelled"]
     }

},{timestamps:true})

const Order=new mongoose.model('Order',orderSchema)

module.exports=Order;

