import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Adjust path as needed
import PageTitle from '../components/PageTitle'; // Adjust path as needed
import Footer from '../components/Footer'; // Adjust path as needed
import { Delete, Edit } from '@mui/icons-material';
import Loader from '../components/loader';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, fetchOrders, removeDelete, removeErrors } from '../features/admin/adminSlice';
import { toast } from 'react-toastify';



const OrderList = () => {

    const { orders, loading, error, deleteError, deletesuccess } = useSelector((state) => state.admin);
    console.log(orders);

    const dispatch = useDispatch();
    const { id } = useParams();

    //api call
    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch])

    //handle error 
    useEffect(() => {
        if (error) {
            toast.error("Failed to fetch orders", { autoClose: 1000 });
            dispatch(removeErrors());
        }
    }, [dispatch, error])


    // handle delete order
    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure to delete the user");
        if (confirm) {
            dispatch(deleteOrder(id))
        }
    }


    //handle delete error and success
    useEffect(() => {
        if (deleteError) {
            toast.error(deleteError, { autoClose: 1000 });
            dispatch(removeDelete());
        }
        if (deletesuccess) {
            toast.success("order deleted successfully", { autoClose: 1000 });
             dispatch(removeDelete());
        }
    }, [dispatch, deleteError, deletesuccess])





    //no orders
    if (!orders || orders.length === 0) {
        return (
            <>
                <Navbar />
                <div className="flex flex-col items-center justify-center text-center py-25 px-4">
                    <h2 className="text-2xl font-semibold text-gray-800">No Orders Found</h2>
                </div>
                <Footer />
            </>
        )
    }
    //loading
    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <Navbar />
            <PageTitle title="All Orders" />

            <div className="bg-gray-50 py-22 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                {/* Table Header */}
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sl No</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Total Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Number of Items</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.map((order, index) => (
                                        <tr key={order._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order._id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                                                <span className={`${order.orderStatus === 'Delivered' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {order.orderStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.totalPrice}/-</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderItems.length}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-4">
                                                    <Link to={`/admin/order/${order._id}`} className="group">
                                                        <Edit />
                                                    </Link>
                                                    <button onClick={() => handleDelete(order._id)} className="group">
                                                        <Delete />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default OrderList;