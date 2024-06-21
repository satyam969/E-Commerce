const { default: slugify } = require("slugify");
const Product=require("../models/productmodel")
const braintree = require("braintree");
const fs=require("fs");
const Category=require("../models/categorymodel");
const Order = require("../models/ordermodel");
const dotenv=require("dotenv");

dotenv.config();
// importing fs module 
// file system
// learn about file system




// payment gateway

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});























const createproduct=async(req,res)=>{


    // post man se form ke through data bhjna hoga aur bina contenttype:application.json hi bhyjna 
  
    try {

        // isme ek problem hai ki hm photo direct nhi la skte so we need a package
// npm i express-formidable in server

// not done 
// then import it in route

const {name,description,price,category,quantity,shipping}=req.fields;
const {photo}=req.files;
// /validation use ZoD 

switch(true){
    case !name:
        return res.status(500).send({error:"Name is Required"})
        case !description:
            return res.status(500).send({error:"descriptionis Required"})
            case !price:
                return res.status(500).send({error:"price is Required"})
                case !category:
                    return res.status(500).send({error:"category is Required"})
                    case !quantity:
                        return res.status(500).send({error:"quantity is Required"})
                        // case !shipping:
                        //     return res.status(500).send({error:"shipping is Required"})
                            case photo && photo.size>1000000:
                                return res.status(500).send({error:"Photo is Required and should be less than 1 mb"})
}

const products=new Product({...req.fields,slug:slugify(name)})

// /photo bhi save ho jyeg aaaise  
if(photo){

    products.photo.data=fs.readFileSync(photo.path);
products.photo.contentType=photo.type;

}



await products.save();
      



res.status(201).send({
  success: true,
  message: "Product Created Successfully",
  products,
});

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in crearing product",
          });
    }




}


// getting all producst

const getallproduct=async(req,res)=>{

try {
    
    // photo nhi chahiye
    // photo k liye alg req tki loading me jyada time na lge 
// created k hisab se sort
// Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s).
// This means that for each product document returned in the query, the corresponding category document will also be fetched and included based on the relationship defined in the schema.
// By using populate, you are able to retrieve additional information related to the referenced category for each product in a single query, rather than making multiple queries to fetch the related data separately.
// In this case, the populate function is used to retrieve the category information for each product,
// populate basically jo id hoga category se uska info le aayega 
// "category": {
//     "_id": "6666c7752c894ca162d24d70",
//     "name": "mobile phones",
//     "slug": "mobile-phones",
//     "__v": 0
//   },


const products=await Product.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1});

res.status(200).send({
    success:true,
    totalcount:products.length,
    message:"All Products",
    products,
   
})



} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error:error.message
    })
}
}

const getsingleproduct=async(req,res)=>{


try {
    
    const {slug}=req.params;


    const product=await Product.findOne({slug}).select("-photo").populate('category');

res.status(200).send({
    success:true,
    message:"Single Product Fetched",
    product
})




} catch (error) {
    console.log(error);

    res.status(500).send({
        success:false,
        message:"Error While getting single product",
        error
    })
}


}



const getphoto=async(req,res)=>{


    try {

        const{pid}=req.params;


        const product=await Product.findOne({_id:pid}).select("photo");

if(product.photo.data){

    // content type set krkr photo bhjna hai
res.set('Content-Type',product.photo.contentType)

res.status(200).send(product.photo.data);

}



        
    } catch (error) {
        console.log(error);

        res.status(500).send({
            success:false,
            message:"Erroer While getting single photo"
        })
    }







}



// delete product 

const deleteproduct=async(req,res)=>{


try {
    const {pid}=req.params;

    // No, this controller will not delete the photo present in the product.
    //  The line await Product.findByIdAndDelete(pid).select("-photo");
    //  is used to delete the product from the database, not the photo associated with the product. 
    // If you want to also delete the photo when deleting the product, 
    // you will need to implement additional logic or functionality to do so.


await Product.findByIdAndDelete(pid).select("-photo");
res.status(200).send({
    message:"Product deleted Succesfully"
})



} catch (error) {
    
    
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Erroer While Deleting a Product"
    })

}







}


// updating product


const updateproduct=async(req,res)=>{
    try {
        const { name, description, price, category, quantity, shipping } =
          req.fields;

        const { photo } = req.files;

        //validation
        switch (true) {
          case !name:
            return res.status(500).send({ error: "Name is Required" });
          case !description:
            return res.status(500).send({ error: "Description is Required" });
          case !price:
            return res.status(500).send({ error: "Price is Required" });
          case !category:
            return res.status(500).send({ error: "Category is Required" });
          case !quantity:
            return res.status(500).send({ error: "Quantity is Required" });
          case photo && photo.size > 1000000:
            return res
              .status(500)
              .send({ error: "photo is Required and should be less then 1mb" });
        }

        console.log("yha");

        const products = await Product.findByIdAndUpdate(
           req.params.pid,
          { ...req.fields, slug: slugify(name) },
          { new: true }
        );

// kr rhA hai kaam

        if ( photo ) {

            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;

          } 



        await products.save();
        res.status(200).send({
          success: true,
          message: "Product Updated Successfully",
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in Update product",
        });
      }

}

// filter
const filterproduct=async(req,res)=>{

try {

// get both check box and radio button

const {checked,radio}=req.body;

// multiple cheeze check krni hai isliye args naam ka bnao
let args={};


// check conditionally
// ki dono ek sath kiya hai select catgeory,price  ya sirf ek kiya hai 

if(checked.length>0){

  args.category=checked;
// checked ki length se pta chlega kitna product add krna hai



}
if(radio.length){
// gte from mongoose greater than equal to
// radio is like this [0,19]
  args.price={$gte:radio[0],$lte:radio[1]};
}


// request 

const products=await Product.find(args);


res.status(200).send({
  success:true,
  message:"Filtered Succesfully",
  products

})

  
} catch (error) {
  console.log(error);
  res.status(400).send({
    success:false,
    message:"Error While Filtering product",
    error
  })
}



}


// load hone pe kitne product dikhane hai el bar me 
// aur hr bar page bdlne pr kitne dikhane hai
const perpageproduct=async(req,res)=>{

  try {

    const perpage=3;
    const page=req.params.page? req.params.page :1;

    // skip kitna krna hai 
    // like page  1pe hai toh alreday 2 product aa chuka hai 
    // toh un dodno ko skip kro 
    // aur aage ke do dikhao

    const products=await Product
    .find({})
    .select("-photo")
    .skip((page-1)*perpage)
    .limit(perpage)
    .sort({createdAt :-1});

    res.status(200).send({
      success:true,
      products
    })

    
  } catch (error) {
    
console.log(error);

res.status(400).send({
  success:false,
  message:"error in per page controller",
  error
})



  }

}


const productcount=async(req,res)=>{

  try {

    // for finding the length of products to make the load more button display and hide 
const total=await Product.find().estimatedDocumentCount();

res.status(200).send({
  success: true,
  total,
});



    
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  
  }



}



const searchproduct=async(req,res)=>{

try {
  const{keyword}=req.params;

  const result =await Product.find({
    $or:[
// ya toh name me mile keyword ya phir description me 
// case sensitive na rhe is liye options:i
{name:{$regex:keyword,$options:"i"}},
{description:{$regex:keyword,$options:"i"}}

    ]
  }).select("-photo")


  res.json(result);


} catch (error) {
  console.log(error);
  res.status(500).send({
    success:false,
    message:"Error in searhing ",
    error
  })
}











}



// Similar Product controller

const similarproduct=async(req,res)=>{


try {


const {pid,cid}=req.params;


const products =await Product.find({

  category:cid,
  // skip the same product
  // not enclude 
  _id:{$ne:pid}

}).select("-photo").limit(3).populate("category");

res.status(200).send({
  success:true,
  message:"Similar products are ",
  products
})





  
} catch (error) {
  
console.log(error);

res.status(404).send({
  success:false,
  message:`errro while getting related product`,
  error
})

}


}



const productcategory=async(req,res)=>{
  try {
    
const {slug}=req.params;

const category=await Category.findOne({slug});

const products=await Product.find({category}).populate('category');

res.status(200).send({
  success: true,
  category,
  products,
});

  } catch (error) {
    console.log(error);
    return res.status(500).send({success:false,
      message:"Something went wrong fetching prod relt category",
      error
    })
  }
}


// payment ke liye sbse pehle gateway bnana pdta hai 

// payment getway api

// forr token
const braintreetoken=async(req,res)=>{

try {

gateway.clientToken.generate({},
  function(err,response){
// documentation
if(err){
  res.status(500).send(err)
}
else{
  res.send(response)
}

  }
)


  
} catch (error) {
  console.log(error);
}

}

// for payment
const braintreepayment=async(req,res)=>{

  try {
// nonce is not from user but from braintree
    const{nonce,cart}=req.body;

let total=0;

// toatl price calculate kro

cart.map((c)=>(
total+=c.price
))


// transaction

let newtransaction=gateway.transaction.sale(
  {
amount:total,
paymentMethodNonce:nonce,
options:{
// kya kya cheese accept krnge
submitForSettlement:true

},
},
function(err,result){

  if(result){

    const order=  new Order({
      products:cart,
      payment:result,
      buyer:req.user._id
    }).save()

res.json({ok:true});


  }else{

    res.status(500).send(
      error
    )


  }

}
)


    
  } catch (error) {
    console.log(error);
  }


}



module.exports={createproduct,getallproduct,getsingleproduct,getphoto,deleteproduct,updateproduct,filterproduct,productcount,perpageproduct,searchproduct,similarproduct,productcategory,braintreetoken,braintreepayment};