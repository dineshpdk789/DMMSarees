const express=require("express");
const orderRouter=express.Router();
const {createNewOrder,getSingleOrder,allMyOrders, getAllOrders,updateOrderStatus, deleteOrder}=require("../controller/orderController");
const {verifyUserAuth, roleBasedAccess}=require("../middleware/userAuth");


//creating order
orderRouter.post("/new/order",verifyUserAuth,createNewOrder);
//getsingle order(user)
orderRouter.get("/order/:id",verifyUserAuth,getSingleOrder);
//getsingle order(admin)
orderRouter.get("/admin/order/:id",verifyUserAuth,roleBasedAccess("admin"),getSingleOrder);
//All my orders(user want to see their order)
orderRouter.get("/orders/user",verifyUserAuth,allMyOrders);
//All orders(admin can see all orders)
orderRouter.get("/admin/orders",verifyUserAuth,roleBasedAccess("admin"),getAllOrders);
//update order status(admin)
orderRouter.put("/admin/order/:id",verifyUserAuth,roleBasedAccess("admin"),updateOrderStatus);
//delete the order
orderRouter.delete("/admin/order/:id",verifyUserAuth,roleBasedAccess("admin"),deleteOrder);


module.exports=orderRouter;