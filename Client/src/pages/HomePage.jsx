
import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";

import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";


// search base flter ke liye global state bnan pda kyuki hmare pas unlimited product bhi ho skte hai 
// toh hm sare ko nhi display kra skte 
// agr kr bhi diya toh phir hmare filters kam nhi krnge 
// kyuki wo alg fetch krega serach alg display krega
// global state me keywords ki state bna denge and uske accrding get krnge 







const HomePage = () => {

  // const URI = import.meta.env.REACT_APP_API;
const URI = "https://e-commerce-liard-delta.vercel.app";


  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // page no so as to load products only for some amount and not all products at once 
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();


  // kon kon se categories check ho gye hai 

  // user multiple category bhi ek time pe select kr skta hai 

  const [checked, setChecked] = useState([]);

  const [radio, setradio] = useState([]);

  // to handle cart
  const [cart, setCart] = useCart();




  const getAllProducts = async () => {

    try {
      setLoading(true);

      const { data } = await axios.get(`${URI}/api/v1/product/product-list/${page}`)

      // console.log(data.success);

      if (data?.success) {
        setLoading(false);
        setProducts(data.products);
      }

    } catch (error) {

      setLoading(false);
      console.log(error);
    }




  }

  const gettotal = async () => {
    try {

      const { data } = await axios.get(`${URI}/api/v1/product/product-count`)

      setTotal(data?.total);


    } catch (error) {

    }



  }

  // load more function when clicked 

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${URI}/api/v1/category/get-category`);


      // console.log(data.success);

      if (data?.success) {
        // console.log("wrks");
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };



  //    life cycle method 

  useEffect(() => {

    gettotal();
    getAllCategory();


  }, [])

  useEffect(()=>{

    if (!checked.length && !radio.length) { getAllProducts(); }

  },[checked.length,radio.length]);


  useEffect(() => {


    if (checked.length || radio.length) { filteredProduct(); }

  }, [checked, radio])


  //  filter by category
  const handleFilter = (value, id) => {
    // sare value jo checked honge WO aa jyenge 
    let all = [...checked]

    if (value) {
      // jisko select kiya uska id 
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }


    setChecked(all);
  }


  //  get filterd product

  const filteredProduct = async () => {

    try {

      const { data } = await axios.post(`${URI}/api/v1/product/product-filters`, {
        checked, radio
      })

      if (data?.success) {

        setProducts(data.products)

      }



    } catch (error) {
      console.log(error);
    }








  }


  // load more function

  const loadmore = async () => {

    try {


      setLoading(true);
      const { data } = await axios.get(`${URI}/api/v1/product/product-list/${page}`);
      setLoading(false);



      setProducts([
        ...products, ...data?.products
      ])




    } catch (error) {

      console.log(error);
      setLoading(false);
    }






  }


  useEffect(() => {



    loadmore();

  }, [page])








  return (
    <Layout title={'All Products - Best offers '}>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">

          <h4 className="text-centre">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => {
                handleFilter(e.target.checked, c._id)
              }}>
                {c.name}


              </Checkbox>


            ))


            }
          </div>




          {/* price Filter */}
          <h4 className="text-centre mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setradio(e.target.value)}>

              {Prices.map((p) => (

                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>



              ))}





            </Radio.Group>

          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-centre">All Products</h1>
          <div className="d-flex flex-wrap">


            {products?.map((p) => (
              <div className="card" key={p._id} style={{ width: '18rem' }}>
                {/* direct is route pr hme image ki id mil jyegi */}
                <img src={`${URI}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">${p.price}</p>
                  <button onClick={() =>
                    navigate(`/product/${p.slug}`)
                  } className="btn btn-primary ms-1">More Details</button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>

                </div>
              </div>


            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default HomePage;