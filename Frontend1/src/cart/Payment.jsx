import React from 'react'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const Payment = () => {
  const navigate = useNavigate();
  const orderItem = JSON.parse(sessionStorage.getItem("orderItem"))
  const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);
 

 const completePayment = async (amount) => {
  if (import.meta.env.DEV) console.debug("Initiating payment for amount:", amount);
  try {
    const { data: keyData } = await axios.get(`${BASE_URL}/api/v1/getKey`, {
      withCredentials: true
    });
    const { key } = keyData;

    const { data: orderData } = await axios.post(
      `${BASE_URL}/api/v1/payment/process`,
      { amount: Number(amount) },
      { withCredentials: true }
    );
    const { order } = orderData;
    if (import.meta.env.DEV) console.debug("Order created:", order);

    // --- CORRECTED OPTIONS OBJECT ---
    const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "ShopEasy",
        description: "ShopEasy website payment Transaction",
        order_id: order.id,
        // Use an HTTPS image (hosted/CDN) or a data URI to avoid mixed-content errors.
        image: "https://placehold.co/128x128?text=ShopEasy",
        handler: async function (response) {
            try {
                const { data } = await axios.post(`${BASE_URL}/api/v1/paymentVerification`, {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                });
                 
                if (data.success) {
                    navigate(`/paymentSuccess?reference=${data.reference}`);
                } else {
                    toast.error("Payment verification failed.", { toastId: "payment-fail" });
                }
            } catch (error) {
                toast.error("An error occurred during verification.", { toastId: "verify-error" });
            }
        },
        prefill: {
            name: user.name,
            email: user.email,
            contact: shippingInfo.phone,
        },
        theme: {
            color: "#3399cc",
        },
    };

    if (!window.Razorpay) {
      console.error("Razorpay SDK not loaded. Add https://checkout.razorpay.com/v1/checkout.js to index.html");
      toast.error("Payment SDK not loaded", { toastId: "razorpay-missing" });
      return;
    }

    try {
      const rzp = new window.Razorpay(options);
      rzp.on && rzp.on('payment.failed', (err) => {
        console.error('Razorpay payment failed', err);
        toast.error('Payment failed');
      });
      rzp.open();
    } catch (err) {
      console.error("Failed to open Razorpay checkout", err);
      toast.error("Unable to open payment popup", { toastId: "razorpay-open" });
    }

  } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred", { autoClose: 1000, toastId: "payment" });
  }
}
  return (
    <>
      <Navbar />
      <PageTitle title="Payment Processing" />
      <div className="bg-gray-50 min-h-screen flex items-center justify-center font-sans">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Confirm Payment
          </h1>
          <div className="flex items-center space-x-4">
            {/* Go back button */}
            <button
              type="button"
              className="bg-white text-gray-800 font-semibold py-3 px-8 rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors duration-300"
            >
              <Link to="/order/confirm">Go back</Link>
            </button>

            {/* Pay button */}
            <button
              type="button"
              className="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors duration-300"
              onClick={() => completePayment(orderItem.total)}>
              Pay ₹{orderItem.total}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment
