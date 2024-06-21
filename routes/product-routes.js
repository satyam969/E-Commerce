const express=require("express");
const { authMiddleware, isAdmin } = require("../middleware/auth-middleware");
const formidable=require("express-formidable")
const productcontroller=require("../controllers/product-controller");
const router=express.Router();


// routes
router.route("/create-product").post(authMiddleware,isAdmin,formidable(),productcontroller.createproduct);


// get all product
router.route("/get-product").get(productcontroller.getallproduct)


// get single product
router.route("/get-product/:slug").get(productcontroller.getsingleproduct);

// product ki id se chahiye
router.route("/product-photo/:pid").get(productcontroller.getphoto);



router.route('/product/:pid').delete(productcontroller.deleteproduct);


router.route('/update-product/:pid').put(authMiddleware,isAdmin,formidable(),productcontroller.updateproduct)

router.route("/product-filters").post(productcontroller.filterproduct)

router.route("/product-list/:page").get(productcontroller.perpageproduct);

router.route('/product-count').get(productcontroller.productcount);


// search product router
router.route('/search/:keyword').get(productcontroller.searchproduct)

// similar product
// on basis of category

router.route('/related-product/:pid/:cid').get(productcontroller.similarproduct)

// get product with category
router.route('/product-category/:slug').get(productcontroller.productcategory)



// first get token from braintree
// token verify hone ke bad transaction possible hai
router.route('/braintree/token').get(productcontroller.braintreetoken)


// route for payments
router.route('/braintree/payment').post(authMiddleware,productcontroller.braintreepayment)


module.exports=router;