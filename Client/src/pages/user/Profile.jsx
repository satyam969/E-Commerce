
import { useEffect, useState } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const [auth,setAuth]=useAuth();
  // to update the details of user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const URI = "https://e-commerce-liard-delta.vercel.app";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`${URI}/api/v1/auth/profile`, {
        name,
        email,
        phone,
        address,
        password
      });

    if(data?.error){
      toast.error(data?.error);
    }
else{
  setAuth({...auth,
    user:data?.updateduser
  })

// also update local storage me jo user save hai uska data

let ls=localStorage.getItem("auth");

ls=JSON.parse(ls);

ls.user=data?.updateduser;
localStorage.setItem("auth",JSON.stringify(ls))

toast.success("Profile Updated Succesfully");



}


  
    
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // initial time pe value ko get krna hai aur bd me display krana hai
useEffect(()=>{

const{email,name,phone,address} =auth?.user;
console.log(auth?.user);
setName(name);
setEmail(email);
setPhone(phone)

setAddress(address)




},[auth?.user])


  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
          <form onSubmit={handleSubmit}>
          <h4 className="title">USER PROFILE</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
              disabled
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="Enter Current Password To cahnge profile"
              placeholder="Enter Current Password To Update profile"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            UPDATE
          </button>
        </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;