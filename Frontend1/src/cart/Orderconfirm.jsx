import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';

const Orderconfirm = () => {
    const {shippingInfo,cartItems}=useSelector((state)=>state.cart);
    const {user}=useSelector((state)=>state.user);
    const navigate=useNavigate();
    const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subTotal * 0;
    const shipping = subTotal > 500 ? 0 : 50;
    const total = subTotal + tax + shipping;
   
    const proceedtopayment=()=>{
        const data={
            subTotal,
            tax,
            shipping,
            total
        }
        sessionStorage.setItem("orderItem",JSON.stringify(data));
        navigate("/process/payment")
    }
    
  return (
    <>
    <Navbar/>
    <PageTitle title="order"/>
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Order Confirmation
        </h1>

        {/* Shipping Details Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipping Details</h2>
          <div className="overflow-x-auto bg-gray-50 rounded-lg border">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium text-gray-600">Name</th>
                  <th scope="col" className="px-6 py-3 font-medium text-gray-600">Phone</th>
                  <th scope="col" className="px-6 py-3 font-medium text-gray-600">Address</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{shippingInfo.phone}</td>
                  <td className="px-6 py-4">{shippingInfo.address},{shippingInfo.selectedCity},{shippingInfo.selectedState},{shippingInfo.selectedCountry},{shippingInfo.pincode}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cart Items Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Cart Items</h2>
          <div className="overflow-x-auto bg-gray-50 rounded-lg border">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium text-gray-600">Image</th>
                  <th scope="col" className="px-6 py-3 font-medium text-gray-600">Product Name</th>
                  <th scope="col" className="px-6 py-3 font-medium text-gray-600">Price</th>
                  <th scope="col" className="px-6 py-3 font-medium text-gray-600">Quantity</th>
                  <th scope="col" className="px-6 py-3 font-medium text-gray-600 text-right">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="bg-white border-b last:border-b-0">
                    <td className="px-6 py-4">
                      <img src={item.image} alt={item.name} className="h-12 w-12 object-cover rounded-md"/>
                    </td>
                    <td className="px-6 py-4 font-medium">{item.name}</td>
                    <td className="px-6 py-4">₹{item.price.toFixed(2)}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4 text-right">₹{item.quantity*item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
          <div className="overflow-x-auto bg-gray-50 rounded-lg border">
            <table className="min-w-full text-left text-sm">
               <thead className="border-b">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium text-gray-600">Subtotal</th>
                  <th scope="col" className="px-6 py-3 font-medium text-gray-600">Shipping Charges</th>
                  <th scope="col" className="px-6 py-3 font-medium text-gray-600">GST</th>
                  <th scope="col" className="px-6 py-3 font-medium text-gray-600 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-6 py-4">₹{subTotal.toFixed(2)}</td>
                  <td className="px-6 py-4">₹{shipping.toFixed(2)}</td>
                  <td className="px-6 py-4">₹{tax.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right font-bold">₹{total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Proceed to Payment Button */}
        <div className="flex   justify-between">
            <button
            type="button"
            className="bg-white text-gray-800 font-semibold py-3 px-8 rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors duration-300"
          >
            <Link to="/shipping">Go back</Link>
          </button>
            <button
              type="button"
              className="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors duration-300"
              onClick={proceedtopayment}>
              Proceed to Payment
            </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Orderconfirm
