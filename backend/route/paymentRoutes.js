
const express=require("express");
const paymentrouter=express.Router();
const {processPayment, sendAPIKey, paymentVerification}=require("../controller/paymentController")
const {verifyUserAuth}=require("../middleware/userAuth")

paymentrouter.post("/payment/process",verifyUserAuth,processPayment)
paymentrouter.get("/getKey",verifyUserAuth,sendAPIKey)
paymentrouter.post("/paymentVerification",paymentVerification)
module.exports=paymentrouter;