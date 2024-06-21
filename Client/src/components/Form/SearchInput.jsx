import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const URI = window.location.origin;

const handleSubmit=async(e)=>{

    e.preventDefault();
  

try {


const {data}=await axios.get(`${URI}/api/v1/product/search/${values.keyword}`);

// global state me set kra kr iske accrding koi aur page pe bhi result show kr skte hai 
setValues({...values,results:data});

// console.log(data);

navigate("/search");
    
} catch (error) {
    
    console.log(error);
}


}



  return (
    <div>
         <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchInput
