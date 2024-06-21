import { useEffect, useState } from "react"
import AdminMenu from "../../components/Layout/AdminMenu"
import Layout from "../../components/Layout/Layout"
import axios from "axios"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
const Products = () => {

   const [products,setProducts]=useState([]);

   const URI = window.location.origin;

   const getAllProducts=async()=>{

    try {

       const {data}=await axios.get(`${URI}/api/v1/product/get-product`)

       console.log(data.success);

       if(data.success){
setProducts(data.products);}
        
    } catch (error) {
        
        console.log(error);
        toast.error("Something Went Wrong");
    }




   }




//    life cycle method 

useEffect(()=>{

getAllProducts();

},[])


// console.log(products);


  return (
    <Layout>
        <div className="row">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-md-9">
                <h1 className="text-centre">All Products List</h1>
                <div className="d-flex">
{products?.map((p)=>(
    <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}  className="product-link">
<div className="card"  style={{width: '18rem'}}>
  {/* direct is route pr hme image ki id mil jyegi */}
  <img src={`${URI}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description}</p>

  </div>
</div>
</Link>

))}
</div>

            </div>
        </div>
      
    </Layout>
  )
}

export default Products
