import  { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    // category id ke bas pe hai
    // product id to update product,getting photo
const [id,setId]=useState("");


const params=useParams();

    
const URI = window.location.origin;



// getting product initiall details 

const getSingleProduct=async()=>{
    try {

        const{slug}=params;
        
        const {data}=await axios.get(`${URI}/api/v1/product/get-product/${slug}`)

console.log(data.product)

if(data.success){
    setName(data.product.name);
    setId(data.product._id);
    setDescription(data.product.description);
    setPrice(data.product.price);
    setPrice(data.product.price);
    setQuantity(data.product.quantity);
    setShipping(data.product.shipping);
    setCategory(data.product.category._id);

}


    } catch (error) {
        console.log(error);
    }
}




// deleting the product

const handleDelete=async()=>{


try {

    // glti se jldi bazi me agr deklete pr click ho gya toh
    // is ka liye ek prompt

    let answer=window.prompt('Are You Sure You Want To Delete The Product');

    if(!answer){
        return;
    }

    const{data}=axios.delete(`${URI}/api/v1/product/product/${id}`)


toast.success("Sucessfully Deleted the Product")

navigate("/dashboard/admin/products");
    
} catch (error) {
    console.log(error);
    toast.error("Something Went Wrong")
}













}










//   get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${URI}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
    getSingleProduct();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // browser ke andr default property mil jati hai FormData
      // research about alternatives
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
    //   photo recieve hoti hai tbhi hme changes krne hai
     photo && productData.append("photo", photo);
      productData.append("shipping",shipping);
      productData.append("category", category);
      const { data } = axios.put(
        `${URI}/api/v1/product/update-product/${id}`,
        productData
      );



      if (data?.success) {
        toast.error(data?.message);
      } else {

        toast.success("Product Updated Successfully");
        // get single product se products page pe bhi update ho jyega
        getSingleProduct();
        navigate("/dashboard/admin/products");

      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };


  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                // value ka prop antd design ke through milta hai react se nhi
                // category set kr rhe hai yha se toh id jana chahiye
                // option change hone pe yha pe id store ho jyega 
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  // agr yha value =c.name daloge toh search k according show krega data
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
               
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    // files array hota hai
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {/* agr photo hai toh display krane ke liye  */}
                {/* agr abhi tk photo upload nhi huwa hai toh previous photo show krna hai otherwise 
                new photo show krna hai  */}
                {photo ? (
                  <div className="text-center">
                    <img
                    // URL propt hoti hai browser ki jisme se hm ye adress acess kr skte hai 
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ):(

                    <div className="text-center">
                    <img
                    // URL propt hoti hai browser ki jisme se hm ye adress acess kr skte hai 
                      src={`${URI}/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>



                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping?"Yes":"No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct
