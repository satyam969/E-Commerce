const express=require('express');

const router=express.Router();
const categorycontroller=require("../controllers/category-controller")
const { authMiddleware, isAdmin } = require('../middleware/auth-middleware');


// routes
router.route('/create-category').post(authMiddleware,isAdmin,categorycontroller.createcategory);

router.route('/update-category/:id').put(authMiddleware,isAdmin,categorycontroller.updatecategory);

// /get all category 
router.route('/get-category').get(categorycontroller.category);


// getting single category
router.route('/single-category/:slug').get(categorycontroller.getSingleCategory);

router.route('/delete-category/:id').delete(authMiddleware,isAdmin,categorycontroller.deleteSingleCategory);



module.exports=router;