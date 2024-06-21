import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout"
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart"
import DropIn from "braintree-web-drop-in-react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
    // getting token for payment
const [clientToken,setClientToken]=useState("");
// instance bhi braintree se hi milta hai
const [instance,setInstance]=useState("");

const[loading,setLoading]=useState(false);





    const [cart,setCart]=useCart();
    const[auth]=useAuth();
const navigate=useNavigate();






const URI = window.location.origin;

const totalprice=()=>{


let total=0;
cart?.map((item)=>{
    total=total +item.price
})

return total.toLocaleString("en-US",{
    style:"currency",
    currency:"USD"
});
}

const removeCartItem=(id)=>{
    try {

        let mycart=[...cart]

        let index=mycart.findIndex(item=> item._id===id)

        // index,position 
        mycart.splice(index,1)
        setCart(mycart);

        localStorage.setItem("cart",JSON.stringify(mycart));
        
    } catch (error) {
        console.log(error);
    }
}


const getpaymenttoken=async()=>{
    try {
        
        const {data}=await axios.get(`${URI}/api/v1/product/braintree/token`)



        setClientToken(data?.clientToken)

    } catch (error) {
        console.log(error);
    }
}


useEffect(()=>{

getpaymenttoken();


},[auth?.token])



const handlePayment=async()=>{

try {

    setLoading(true);


    // console.log(instance);

    const {nonce}= await instance.requestPaymentMethod();

    const {data} =await axios.post(`${URI}/api/v1/product/braintree/payment`,{
        nonce,cart
    })
    setLoading(false);

    // local storage se remove krdo aur 
    localStorage.removeItem('cart');

    setCart([])

    navigate('/dashboard/user/orders');
    
    toast.success("PAYment COMPleted ")
} catch (error) {
    console.log(error);
    setLoading(false);
}





}














  return (
    <Layout>

<div className="container">
<div className="row">
   <div className="col-md-12">

<h1 className="text-centre bg-light p-2 mb-1">

{`Helo ${auth.token && auth?.user.name}`}

</h1>
<h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>

   </div>
</div>
<div className="row">
    <div className="col-md-6">
        {/* map cart  */}

        {cart?.map(p=>(
<div key={p._id} className="row mb-2 p-3 cart flex-row">

    <div className="col-md-4 ">
    <img src={`${URI}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} 
    width="100px" height="100px" />
    </div>
    <div className="col-md-8">
       <p>{p.name}</p>
       <p>{p.description.substring(0,30)}</p>
       <p>Price: {p.price}</p>
       <button className="btn btn-danger" onClick={()=>{removeCartItem(p._id)}}>Remove</button>
    </div>
</div>


        ))}
  
    </div>
    <div className="col-md-4 text-centre">
       <h4>
        Cart Summary
       </h4>
       <p>Total | Checkout | Payment</p>
       <hr />
       <h4>Total : {totalprice()}</h4>
       {auth?.user?.address ?(
        // user k adress h
        <>
        <div className="mb-3">
            
            <h4>Current Address</h4>
            <h5>{auth?.user?.address}</h5>
            
            <button onClick={()=>{
                navigate("/dashboard/user/profile")
            }} className="btn btn-outline-warning">Update Address</button>

            </div></>
       ):(
        // login hai ki nhi
        <div className="mb-3">
            {auth?.token ? (
                <button className="btn btn-outline-warning" onClick={()=>{
                    navigate("/dashboard/user/profile")
                }}>Update Address</button>
            ):(

                <button className="btn btn-outline-warning" onClick={()=>{
                    navigate("/login",{
                        // isse login hone k bad sidhe cart pe redirect honge 
                        state:"/cart"
                    })
                }} >Please Log In To Checkout</button>

            )
            
        
        }
        </div>



       ) }

<div className="mt-2">
    {/* agr client token mila tbhi drop show hoga  */}
    {!clientToken || !cart?.length ? (""):(

<>
<DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => {
                        setInstance(instance)}}
                  />
          <button className="btn btn-primary mb-2" onClick={handlePayment } 
        //   disabled={ !loading || !instance || !auth?.user?.address } 
          >
            {loading ? "Processing...":"MAKE PAYMENT"}</button>

</>

    )}

</div>
    </div>
</div>
</div>
    </Layout>
  )
}

export default CartPage
