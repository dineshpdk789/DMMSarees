import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, removeErrors } from '../features/order/orderSlice';
import { toast } from 'react-toastify';
import Loader from '../components/loader';



const OrderDetails = () => {
    
    
    const dispatch=useDispatch();
    const {id}=useParams();
    const {order,loading,error}=useSelector((state)=>state.order);
    const paymentStatus=order.paymentInfo?.status==="succeeded"?"Paid":"Not Paid"
    const finalOrderStatus=order.paymentStatus==="Not Paid"?"Cancelled":order.orderStatus;

     useEffect(() => {
        dispatch(getOrderDetails(id));
    }, [dispatch, id]);

     useEffect(() => {
        if (error) {
            toast.error(error, { autoClose: 1000, toastId: "orderstatus" });
            dispatch(removeErrors()); // Clear the error after showing it
        }
    }, [error, dispatch]);

     if (loading) {
        return <Loader />;
    }
     

  return (
    <>
      <Navbar />
      <PageTitle title={`Order #${id}`} />

      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Order Items Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Items</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-500 uppercase">Image</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-500 uppercase">Name</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-500 uppercase">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.orderItems?.map((item) => (
                    <tr key={item.product} className="border-t border-gray-200">
                      <td className="py-4 px-4">
                        <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-md" />
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-800 font-medium">
                        <Link to={`/product/${item.product}`} className="hover:text-indigo-600">
                          {item.name}
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{item.quantity}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">₹{item.price}/-</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Shipping Info Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Info</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-sm text-gray-800">{order.shippingInfo?.address},{order.shippingInfo?.city},{order.shippingInfo?.country},{order.shippingInfo?.pincode}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-sm text-gray-800">{order.shippingInfo?.phoneNo}</p>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-500">Order Status</p>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.orderStatus === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                  {finalOrderStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-500">Payment Status</p>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {paymentStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-500">Paid At</p>
                <p className="text-sm text-gray-800">{new Date(order.paidAt).toLocaleString()}</p>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-500">Items Price</p>
                <p className="text-sm text-gray-800">₹{order.itemPrice}/-</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-500">Tax Price</p>
                <p className="text-sm text-gray-800">₹{order.taxPrice}/-</p>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between">
                <p className="text-lg font-bold text-gray-800">Total Price</p>
                <p className="text-lg font-bold text-gray-800">₹{order.totalPrice}/-</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderDetails;