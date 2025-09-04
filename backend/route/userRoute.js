const express=require("express");
const authRouter=express.Router();
const {registerUser,loginUser,logout,requestresetPassword,
    resetPassword,fetchProfile,updatePassword,
    updateProfile,getUsersList,getSingleUser,updateUserRole,deleteUser,contactUs}=require("../controller/userController");
const {verifyUserAuth, roleBasedAccess}=require("../middleware/userAuth");

//register
authRouter.post("/register",registerUser);
//login
authRouter.post("/login",loginUser);
//logout
authRouter.post("/logout",logout);
//requestresetpassword
authRouter.post("/requestresetpassword",requestresetPassword);
//resetpassword
authRouter.post("/reset/:token",resetPassword);
//getuserdetail
authRouter.get("/fetchprofile",verifyUserAuth,fetchProfile);
//updatepassword
authRouter.put("/updatepassword",verifyUserAuth,updatePassword);
//updateProfile
authRouter.put("/updateprofile",verifyUserAuth,updateProfile);
// admin getting users
authRouter.get("/admin/getallusers",verifyUserAuth,roleBasedAccess("admin"),getUsersList);
//admin getting single user
authRouter.get("/admin/user/:id",verifyUserAuth,roleBasedAccess("admin"),getSingleUser);
//admin changing user role
authRouter.put("/admin/user/:id",verifyUserAuth,roleBasedAccess("admin"),updateUserRole);
//admin deleting the sue
authRouter.delete("/admin/user/:id",verifyUserAuth,roleBasedAccess("admin"),deleteUser);
// contact us
authRouter.post("/contact", contactUs);
module.exports=authRouter;