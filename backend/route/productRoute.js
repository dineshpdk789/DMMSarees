const express=require("express");
const productRouter=express.Router();
const {createProducts,getAllProducts,updateProduct,deleteProduct,getsingleProduct,getAdminProducts, createReviewForProduct,getProductReviews,deleteReview} =require("../controller/productController");
const {verifyUserAuth, roleBasedAccess}=require("../middleware/userAuth");

//create product
productRouter.post("/admin/createproduct",verifyUserAuth,roleBasedAccess("admin"),createProducts);
//getall product
productRouter.get("/getproducts",getAllProducts);
//updatep roduct
productRouter.put("/admin/updateproduct/:id",verifyUserAuth,roleBasedAccess("admin"),updateProduct);
//delete product
productRouter.delete("/admin/deleteproduct/:id",verifyUserAuth,roleBasedAccess("admin"),deleteProduct);
//getsingle product detail
productRouter.get("/getsingleproduct/:id",getsingleProduct);
//Admin get all product
productRouter.get("/admin/getallproduct",getAdminProducts);
//creating and updating review  
productRouter.put("/createreview",verifyUserAuth,createReviewForProduct);
//getProduct review
productRouter.get("/admin/review/:id",verifyUserAuth,roleBasedAccess("admin"),getProductReviews);
//Deleting review  
productRouter.delete("/admin/review",verifyUserAuth,roleBasedAccess("admin"),deleteReview);

module.exports=productRouter;