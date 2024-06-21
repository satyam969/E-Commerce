const express=require("express");

const router=express.Router();
const authController=require("../controllers/auth-controller");
const {authMiddleware,isAdmin} = require("../middleware/auth-middleware");


// routing



router.route("/register").post(authController.registercontroller);

router.route("/login").post(authController.logincontroller);


router.post("/forgot-password", authController.forgotpassword);

// test route
// router.get("/test", authMiddle, isAdmin, testController);


// protected route
router.route("/user-auth").get(authMiddleware,(req,res)=>{
   res.status(200).send({
    ok:true
   });
});


// test route for admin
router.route("/admin-auth").get(authMiddleware,isAdmin,(req,res)=>{
    res.status(200).send({ ok: true });
})


// update profile
router.route("/profile").put(authMiddleware,authController.updateuser);

// for getting the orders of users

router.route("/order").get(authMiddleware,authController.getorder);

// all orders (admin )
router.route("/all-orders").get(authMiddleware,isAdmin,authController.getallorder);

// change status of orders
router.route("/order-status/:orderId").put(authMiddleware,isAdmin,authController.orderstatus);

module.exports=router