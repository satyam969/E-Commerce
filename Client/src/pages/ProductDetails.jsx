import  Layout  from "../components/Layout/Layout"
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";


const ProductDetails = () => {

    const [product,setProduct]=useState([]);
    const params=useParams();
    const [related,setRelated]=useState([]);
const navigate=useNavigate();

const URI = "https://e-commerce-liard-delta.vercel.app";

    // initial deatial 
const getProduct=async()=>{


    try {
        const{slug}=params;
        
const {data}=await axios.get(`${URI}/api/v1/product/get-product/${slug}`)

// console.log(data);
setProduct(data?.product);






similarproduct(data?.product._id,data?.product?.category?._id);
    
 




    } catch (error) {
        console.log(error);
    }
}

const similarproduct=async(pid,cid)=>{


    try {

      
if(pid && cid){
const{data}=await axios.get(`${URI}/api/v1/product/related-product/${pid}/${cid}`)

setRelated(data?.products);
}
        
    } catch (error) {
        console.log(error);
    }
}


useEffect(()=>{

if(params?.slug)getProduct();



},[params])














  return (
    <Layout>    
<div className="row container mt-2">
    <div className="col-md-6"><img
    height="300" width="350"
    src={`${URI}/api/v1/product/product-photo/${product?._id}`} alt={product?.name} /></div>
    <div className="col-md-6">
<h1 className="text-centre">Product Details</h1>

<h6>Name : {product?.name}</h6>
<h6>Description : {product?.description}</h6>
<h6>Price : {product?.price}</h6>
<h6>Category: {product?.category?.name}</h6>
<button className="btn btn-secondary ms-1">Add To Cart</button>





    </div>
</div>
<hr />
<div className="row">
    <h6>Similar Product</h6>
    <h6>{related.length<1 ? "No similar Product Found" : " "}</h6>
   <div className="d-flex flex-wrap mt-2">
   {related?.map((p)=>(
<div className="card" key={p._id} style={{width: '18rem'}}>
  {/* direct is route pr hme image ki id mil jyegi */}
  <img src={`${URI}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description.substring(0,30)}</p>
    <p className="card-text">${p.price}</p>       
<button onClick={()=>
{
  navigate(`/product/${p.slug}`)
// window.location.reload()
}
} className="btn btn-primary ms-1">More Details</button>
<button className="btn btn-secondary ms-1">Add To Cart</button>

  </div>
</div>


))}
   </div>
</div>

      
    </Layout>
  )
}

export default ProductDetails
