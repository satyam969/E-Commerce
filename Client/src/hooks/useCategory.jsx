import axios from "axios";
import { useEffect, useState } from "react"


const useCategory = () => {
const [categories,setCategories]=useState([]);

const URI = window.location.origin;



const getcategory=async()=>{
    try {
        
const{data}=await axios.get(`${URI}/api/v1/category/get-category`)

// console.log(data);

setCategories(data?.category);

    } catch (error) {
        console.log(error);
    }
}


useEffect(()=>{
getcategory();
},[])

// console.log(categories);

  return categories
}

export default useCategory
