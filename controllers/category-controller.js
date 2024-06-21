const Category = require("../models/categorymodel");
const slugify =require("slugify");
const createcategory=async(req,res)=>{


   try {
    const{name}=req.body;
    if(!name){

        return res.staus(401).send({meassage:"name is required"});


    }

    const ispresent= await Category.findOne({name});



    if(ispresent){
        return res.status(200).send({
            success: false,
            message: "Category Already Exisits",
          });
        }

    const response= await Category.create({name,slug:slugify(name)});
// or category

res.status(201).send({
    success: true,
    message: "new category created",
    category,
  });
    
   } catch (error) {
    console.log(error);
    
   }





}


const updatecategory=async(req,res)=>{

    try {
         
        const {name}=req.body;
        const {id}=req.params;

//         const ispresent=await Category.findOne({name});

//         if(!(ispresent.ok)){
// return res.status(400).send({message:"Category Not Found"});
//         }

// const updatecategory= await Category.updateOne({name},{
//     $set:newname
// });


// or simply one command 
const updatecategory=await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});

// if(updatecategory.ok){
    return res.status(200).send({
        success:true,
        updatecategory});
// }
        
// else{
//     res.status(401).send("category Not updated");
// }






    } catch (error) {
        console.log(error);
    }

}


const category=async(req,res)=>{ 


try {

    


    const category=await Category.find({});


    if(category){
      
        return res.status(200).send({
            success:true,
            category});
    }




    
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error Geting data ",
        error
    })
}







}


const getSingleCategory=async()=>{
try {
    
    const{slug}=req.params.slug;

const singlecategory=await Category.findOne({slug});

if(singlecategory){

    return res.status(200).send({
        success:true,
        singlecategory});


}

} catch (error) {
    
}




}


const deleteSingleCategory=async(req,res)=>{

    try {

        const {id}=req.params;
        
        const deletedcategory=await Category.findByIdAndDelete({_id:id});


        if(deletedcategory){

            return res.status(200).send({
                success:true,
                deletedcategory});

        }

    
    } catch (error) {
     console.log(error);   
    }






}




module.exports={createcategory,updatecategory,category,getSingleCategory,deleteSingleCategory};