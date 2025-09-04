import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { LaunchOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllMyOrders } from '../features/order/orderSlice';
import { removeErrors } from '../features/user/userSlice';
import Loader from '../components/loader';




const MyOrders = () => {

    const { orders, loading, error } = useSelector((state) => state.order);
    console.log(orders);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllMyOrders());

        if (error) {
            toast.error(error, { autoClose: 1000 });
            dispatch(removeErrors());
        }
    }, [dispatch])




    return (
        <>
            <Navbar />
            <PageTitle title="My Orders" />

            {
                loading ? (<Loader />) : orders.length > 0 ? (
                    <div className="bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        {/* Table Header */}
                                        <thead className="bg-gray-800">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                                                >
                                                    Order ID
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                                                >
                                                    Items Count
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                                                >
                                                    Status
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                                                >
                                                    Total Price
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                                                >
                                                    View Order
                                                </th>
                                            </tr>
                                        </thead>

                                        {/* Table Body */}
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {orders.map((order) => (
                                                <tr key={order._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {order._id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {order.orderItems.length}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <span
                                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Processing'
                                                                    ? 'bg-yellow-100 text-yellow-800'
                                                                    : 'bg-green-100 text-green-800'
                                                                }`}
                                                        >
                                                            {order.orderStatus
                                                            }
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        ₹{order.totalPrice}/-
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <Link to={`/order/${order._id}`} className="group">
                                                            <LaunchOutlined />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col items-center justify-center text-center py-25 px-4 min-h-screen">
                            <h2 className="text-2xl font-semibold text-gray-800">No Orders Found</h2>
                            <p className="text-gray-500 mt-2">You haven't placed any orders with us yet.</p>
                            <Link
                                to="/"
                                className="mt-6 bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-900 transition-colors duration-300"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    </>
                )
            }

            <Footer />
        </>
    );
};

export default MyOrders;