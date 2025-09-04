import React from 'react';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartItems from './CartItem';
import CartEmpty from "./CartEmpty";

const Cart = () => {

    const { cartItems } = useSelector((state) => state.cart);
    const { isAuthenticated,loading } = useSelector((state) => state.user);
    const navigate=useNavigate();
    //cart total
    const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = 0;
    const shipping = subTotal > 500 ? 0 : 50;
    const total = subTotal + tax + shipping;

    const handlecheckout = () => {
        if (!isAuthenticated) {
          navigate("/login");
          toast.error("Login to continue",{autoClose:1000,toastId:"cart-checkout"})
        }
        else{
            navigate("/shipping");
        }
    }
   


    return (
        <>
            <PageTitle title="Your Cart" />
            <Navbar />
            {
                cartItems.length === 0 ? <CartEmpty /> : (
                    <>
                        {/* Main Content  */}
                        <div className="container mx-auto mt-10 pt-5 mb-20 px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col lg:flex-row shadow-md my-10">

                                {/* Left Column  Cart Items */}
                                <div className="w-full lg:w-3/4 bg-white px-4 sm:px-10 py-10">
                                    <div className="flex justify-between border-b pb-8">
                                        <h1 className="font-semibold text-2xl">Your Cart</h1>
                                        <h2 className="font-semibold text-2xl">{cartItems.length} Item</h2>
                                    </div>

                                    {/* Cart Items Header - Hidden on mobile */}
                                    <div className="hidden lg:flex mt-10 mb-5 text-gray-600">
                                        <h3 className="font-semibold text-xs uppercase w-2/5">Product Details</h3>
                                        <h3 className="font-semibold text-center text-xs uppercase w-1/5">Quantity</h3>
                                        <h3 className="font-semibold text-center text-xs uppercase w-1/5">Item Total</h3>
                                        <h3 className="font-semibold text-center text-xs uppercase w-1/5">Actions</h3>
                                    </div>

                                    {/* ---  Cart Item --- */}
                                    {
                                        cartItems.map((item, idx) => (
                                            // prefer a stable id; fall back to index if necessary
                                            <CartItems key={item.product || item._id || item.id || idx} item={item} />
                                        ))
                                    }
                                    {/* --- End Cart Item --- */}

                                </div>

                                {/* Right Column  Price Summary */}
                                <div id="summary" className="w-full lg:w-1/4 px-8 py-10 bg-gray-100">
                                    <h1 className="font-semibold text-2xl border-b pb-8">Price Summary</h1>
                                    <div className="mt-8">
                                        <div className="flex font-semibold justify-between py-2 text-sm uppercase">
                                            <span>Subtotal</span>
                                            <span>{subTotal}</span>
                                        </div>
                                        <div className="flex justify-between py-2 text-sm uppercase">
                                            <span>Tax </span>
                                            <span>{tax}</span>
                                        </div>
                                        <div className="flex justify-between py-2 text-sm uppercase">
                                            <span>Shipping</span>
                                            <span>{shipping}</span>
                                        </div>
                                    </div>

                                    <div className="border-t mt-8">
                                        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                            <span>Total</span>
                                            <span>{total}</span>
                                        </div>
                                        <button className="bg-gray-800 font-semibold hover:bg-gray-900
                                         py-3 text-sm text-white uppercase w-full rounded"  onClick={handlecheckout}>
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>
                )
            }
            <Footer />
        </>
    );
}

export default Cart;