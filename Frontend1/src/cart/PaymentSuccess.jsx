import React, { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createOrder, removeSuccess } from '../features/order/orderSlice';
import { clearCart } from '../features/cart/cartSlice';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const reference = searchParams.get("reference");
    const { cartItems, shippingInfo } = useSelector((state) => state.cart)
    const { success, error } = useSelector((state) => state.order);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const createOrderData = async () => {
            const orderItem = JSON.parse(sessionStorage.getItem("orderItem"));

            const alreadyPlaced = sessionStorage.getItem("orderPlaced");

            if (!orderItem || alreadyPlaced === "true") return;
            //  prevent duplicate order

            try {

                const orderData = {
                    shippingInfo: {
                        address: shippingInfo?.address,
                        city: shippingInfo?.selectedCity,
                        country: shippingInfo?.selectedCountry,
                        phoneNo: shippingInfo?.phone,
                        pincode: shippingInfo?.pincode
                    },
                    orderItems: cartItems?.map((item) => ({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image,
                        product: item.product_id,
                    })),
                    paymentInfo: {
                        id: reference,
                        status: "succeeded",
                    },
                    itemPrice: orderItem?.subTotal,
                    taxPrice: orderItem?.tax,
                    shippingPrice: orderItem?.shipping,
                    totalPrice: orderItem?.total,

                }
                dispatch(createOrder(orderData));
                sessionStorage.setItem("orderPlaced", "true");
                sessionStorage.removeItem("orderItem");

            }
            catch (error) {
                toast.error(error.message, { autoClose: 1000, toastId: "order" })

            }
        }
        createOrderData();
    }, [])


    //succeess and error
    useEffect(() => {
        if (success) {
            toast.success("Order Placed", { autoClose: 1000, toastId: "orderplaced" });
            dispatch(clearCart());
            dispatch(removeSuccess());
        }
        if (error) {
            toast.error(error, { autoClose: 1000 });
            dispatch(removeSuccess());
        }
    }, [dispatch, success, error])

    //clean up orderPlaced when component unmounts
    useEffect(() => {
        return () => {
            sessionStorage.removeItem("orderPlaced");
        };
    }, []);


    return (
        <>
            <PageTitle title="Order " />
            <Navbar />
            <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center font-sans">
                <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md w-full">

                    {/* Green Checkmark Icon */}
                    <div className="mb-4">
                        <svg
                            className="w-16 h-16 mx-auto text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                    </div>

                    {/* Main Text */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Order Confirmed!
                    </h1>

                    {/* Subtext with Reference ID */}
                    <p className="text-gray-600 mb-6">
                        Payment successful. Reference ID:
                        <span className="font-semibold text-gray-700 ml-1">{reference}</span>
                    </p>

                    {/* Explore More Products Button */}
                    <Link
                        to="/orders/user" // Link to your homepage or products page
                        className="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors duration-300"
                    >
                        View order
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PaymentSuccess
