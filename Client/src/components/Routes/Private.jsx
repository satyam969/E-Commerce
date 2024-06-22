import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  console.log("auth",auth);

  const URL = "https://e-commerce-liard-delta.vercel.app";

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${URL}/api/v1/auth/user-auth`);
      console.log("res",res);
      if (res.statusText) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}