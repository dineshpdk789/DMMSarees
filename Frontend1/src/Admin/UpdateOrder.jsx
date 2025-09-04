import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../features/order/orderSlice'; // Make sure you have this
import { updateOrderStatus, removeErrors, removeSuccess, removeDelete, removeMessage } from '../features/admin/adminSlice'; // Assuming you have this
import Loader from '../components/loader';
import { toast } from 'react-toastify';

const UpdateOrder = () => {
    const [status, setStatus] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Select state from the correct slices
    const { order, loading: orderLoading, error: orderError } = useSelector((state) => state.order);
    const { loading: adminLoading, error: adminError, updateSuccess,message } = useSelector((state) => state.admin);

    // Fetch order details
    useEffect(() => {
        if (id) {
            dispatch(getOrderDetails(id));
        }
    }, [dispatch, id]);

    // Set initial status once the order is loaded
    useEffect(() => {
        if (order && order.orderStatus) {
            setStatus(order.orderStatus);
        }
    }, [order]);
    
    // Handle success and error messages
    useEffect(() => {
        if (orderError) {
            toast.error(orderError);
            dispatch(removeErrors()); // Assuming this action exists in orderSlice
        }
        if (adminError) {
            toast.error(adminError);
            dispatch(removeErrors()); // Assuming this action exists in adminSlice
        }
        if (updateSuccess) {
            toast.success(message);
            dispatch(removeMessage());
            dispatch(getOrderDetails(id));
        }
    }, [orderError, adminError, updateSuccess, dispatch, navigate, message]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!status) {
            toast.error("Please select a status");
            return;
        }
        dispatch(updateOrderStatus({ id, status }));
        alert(`Updating status to: ${status}`);
    };

    const paymentStatus=order?.paymentInfo?.status==="succeeded"?"Paid":"Not Paid";
    const finalOrderStatus=paymentStatus==="Not Paid"?"Cancelled":order?.paymentInfo?.status;

    // Show a loader while the order data is being fetched
    if (orderLoading) {
        return <Loader />;
    }

    return (
        <>
            <Navbar />
            <PageTitle title="Update Order" />
            <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Order Information Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Information</h2>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><span className="font-medium text-gray-800">Username:</span> {order?.user?.name}</p>
                            <p><span className="font-medium text-gray-800">Order ID:</span> {order?._id}</p>
                            <p><span className="font-medium text-gray-800">Payment ID:</span> {order?.paymentInfo?.id}</p>
                            <p><span className="font-medium text-gray-800">Order Date:</span> {order?.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</p>
                            <p><span className="font-medium text-gray-800">Shipping Address:</span> {order?.shippingInfo?.address}</p>
                            <p><span className="font-medium text-gray-800">Order Status:</span>
                                <span className={`ml-2 font-semibold ${order?.orderStatus === 'Delivered' ? 'text-green-600' : 'text-red-600'}`}>
                                    {order?.orderStatus}
                                </span>
                            </p>
                            <p><span className="font-medium text-gray-800">Payment Status:</span>
                                <span className="ml-2 font-semibold text-green-600">{paymentStatus}</span>
                            </p>
                            <p><span className="font-medium text-gray-800">Total Price:</span> ₹{order?.totalPrice}/-</p>
                        </div>
                    </div>

                    {/* Order Items Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Items</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* FIX: Use optional chaining here as well */}
                                    {order?.orderItems?.map((item) => (
                                        <tr key={item.product}>
                                            <td className="py-4 px-4"><img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-md" /></td>
                                            <td className="py-4 px-4 text-sm font-medium"><Link to={`/product/${item.product}`} className="hover:text-indigo-600">{item.name}</Link></td>
                                            <td className="py-4 px-4 text-sm">{item.quantity}</td>
                                            <td className="py-4 px-4 text-sm">₹{item.price}/-</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Update Order Status Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Order Status</h2>
                        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
                            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full md:w-1/3 px-4 py-3 border rounded-md bg-white" required>
                                <option value="">Select Status</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                            <button type="submit" disabled={adminLoading ||order.orderStatus==="Delivered" } className="py-3 px-6 border   disabled:cursor-not-allowed  rounded-md text-white bg-gray-800 hover:bg-gray-900">
                                {adminLoading ? "Updating..." : "Update Status"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UpdateOrder;