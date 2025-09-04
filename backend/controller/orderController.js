const { User } = require("../modals/userModel");
const { Product } = require("../modals/productModel");
const { Order } = require("../modals/orderModels");


//create new order(admin)
const createNewOrder = async (req, res) => {
    try {
        const { shippingInfo, orderItems, paymentInfo, itemPrice,
            taxPrice, shippingPrice, totalPrice } = req.body;


        const order = await Order.create({
            shippingInfo, orderItems, paymentInfo, itemPrice,
            taxPrice, shippingPrice, totalPrice, paidAt: Date.now(), user: req.user._id
        });


        res.status(200).json({
            success: true,
            message: "Order Created Successfully",
            order
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Order Creation Failed"
        })
    }
}
//get single order(admin)
const getSingleOrder = async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        res.status.json({
            success: false,
            message: "No order found"
        })
    }

    res.status(200).json({
        success: true,
        order
    })
}

//All my orders(user want to see their order)
const allMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    if (!orders) {
        res.status(404).json({
            success: false,
            message: "No order found"
        })
    }
    res.status(200).json({
        success: true,
        orders
    })
}

//All orders(admin)
const getAllOrders = async (req, res) => {

    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })


    if (!orders) {
        res.status(404).json({
            success: false,
            message: "No order found"
        })
    }

    res.status(200).json({
        success: true,
        orders,
        totalAmount
    })
}

//update order status
const updateOrderStatus = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).json({
            success: false,
            message: "No order found"
        })
    }
    if (order.orderStatus === "Delivered") {
        return res.status(200).json({
            success: true,
            message: "The order is already delivered"
        })
    }

    order.orderStatus = req.body.status;

    if (order.orderStatus === "Delivered") {
    // Decrease stock only when marking as delivered
    await Promise.all(order.orderItems.map(item => updateQuantity(item.product, item.quantity)));
    order.deliveredAt = Date.now();
}

    await order.save({ validateBeforeSave: false });

    return res.status(200).json({
        success: true,
        message:"Order status updated successfully",
        order
    })

}
//function for updating quantiy of product
async function updateQuantity(id, quantity) {
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "No product found"
        })
    }
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });

}


//deleteing order
const deleteOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        res.status(404).json({
            success: false,
            message: "No order found"
        })
    }

    if (order.orderStatus !== "Delivered") {

        res.status(404).json({
            success: true,
            message: "This order is under Processing and cannot deleted"
        })

    }

    await Order.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        message: "Order deleted successfully"
    })

}


module.exports = { createNewOrder, getSingleOrder, allMyOrders, getAllOrders, updateOrderStatus, deleteOrder };