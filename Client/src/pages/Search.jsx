// for dispolaying the search result

import { Layout } from "antd"
import { useSearch } from "../context/search"


const Search = () => {

    const [values,setValues]=useSearch();

    const URI = "https://e-commerce-liard-delta.vercel.app";

  return (
    <Layout title={'search results'}>
      <div className="container">
        <div className="text-centre">
            <h1>Search Results</h1>

{/* to display no of products found with same keyword */}
<h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${URI}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Search
