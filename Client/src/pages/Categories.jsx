import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout"
import useCategory from "../hooks/useCategory"


const Categories = () => {

    const categories=useCategory();



  return (
    <Layout title={"All Categories"}>
      

<h1>All Categories</h1>
<div className="container">
<div className="row">
    {categories.map((c)=>(

<div key={c._id} className="col-md-6 mt-5 mb-3 gx-3 gy-4">

<Link  className="btn btn-primary" to={`/category/${c.slug}`}>{c.name}</Link>

</div>

    ))
}
</div>


</div>

    </Layout>
  )
}

export default Categories
