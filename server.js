require("dotenv").config();
const express = require("express");
const colors=require("colors");
const ConnectDb = require("./config/db");
const cors=require("cors")
// Import wle syntax me file ka extension bhi dena pdta hai
const authRoutes=require("./routes/auth-routes");
const categoryRoutes=require("./routes/category-route")
const productRoutes=require("./routes/product-routes");
const app=express();

const corsOptions={
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
}
// cors ko btana hai ki 5173 bhi mera hi part hai 
// data jaye isliye sbse upar isko state kro 
app.use(cors(corsOptions));



// front end with backend

const path = require("path");

app.get("/", (req, res) => {
app.use(express.static(path.join(__dirname, "./Client/dist")));
res.sendFile(path.join(__dirname, "frontend", ",Client/dist/index.html"));
});



// rest object

const morgan =require("morgan");




// middleware
// Morgan is another HTTP request logger middleware for Node. js.
//  It simplifies the process of logging requests to your application. Using
// kitne time me load huwa ye sb btat hai production pe koi jrurat nhi hai
app.use(express.json());
app.use(morgan('dev'));


// api(routes)

app.use("/api/v1/auth",authRoutes);


// routes for category
app.use("/api/v1/category",categoryRoutes);

// routes for products
app.use("/api/v1/product",productRoutes);









// port 
const port=process.env.PORT;

// run listen


ConnectDb().then(()=>{
    app.listen(port,()=>{


        console.log(`server running at ${port}`.bgCyan.white);
    
    })}
).catch((e)=>{
    console.log("error",e)
})
