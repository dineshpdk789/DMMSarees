import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Adjust path as needed
import PageTitle from '../components/PageTitle'; // Adjust path as needed
import Footer from '../components/Footer'; // Adjust path as needed
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProducts, fetchAdminProducts, removeErrors } from '../features/admin/adminSlice';
import { toast } from 'react-toastify';
import Loader from '../components/loader';



const ProductList = () => {



    const { products, loading, error,deletError,deletesuccess } = useSelector((state) => state.admin);
    console.log(products);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAdminProducts());
    }, [dispatch])

    useEffect(() => {
        if (error) {
            toast.error("Failed to fetch product", { autoClose: 1000 });
            dispatch(removeErrors());
        }
    }, [dispatch, error])

    //handle delete error and success
    useEffect(() => {
        if (deletError) {
            toast.error("Failed to delete products", { autoClose: 1000 });
            dispatch(removeErrors());
        }
        if (deletesuccess) {
            toast.success("product deleted successfully", { autoClose: 1000 });
            dispatch(removeErrors());
        }
    }, [dispatch,deletError,deletesuccess])



    //handle prodcut delete
   const handleDelete=(productId)=>{
    const isConfirmed=window.confirm("Are you sure to delete this product?")
    if(isConfirmed){
        dispatch(deleteProducts({id:productId}));
        if (error) {
            toast.error("Failed to fetch product", { autoClose: 1000 });
            dispatch(removeErrors());
        }
        if (success) {
            toast.error("Product deleted successfully", { autoClose: 1000 });
            dispatch(removeSuccess());
        }
    }
   }




    if (!products || products.length === 0) {
        return (
            <>
                <div className="flex flex-col items-center justify-center text-center py-20 px-4">
    
                    <h2 className="text-2xl font-semibold text-gray-800">No Products Found</h2>
                    <p className="text-gray-500 mt-2">There are no products in the inventory yet.</p>
                    <Link
                        to="/admin/product/new" // Link to your create product page
                        className="mt-6 bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-900 transition-colors duration-300"
                    >
                        Create First Product
                    </Link>
                </div>
            </>
        )
    }


    return (
        <>
            <Navbar />
            <PageTitle title="All Products" />

            {
                loading ? (<Loader />) : (
                    <div className="bg-gray-50 pt-32 px-4 sm:px-6 lg:px-8 min-h-screen">
                        <div className="max-w-7xl mx-auto">
                            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        {/* Table Header */}
                                        <thead className="bg-gray-800">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sl No</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product Image</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Price</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Category</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Stock</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Created At</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>

                                        {/* Table Body */}
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {products.map((product, index) => (
                                                <tr key={product.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <img src={product.image[0].url} alt={product.name} className="h-12 w-12 object-cover rounded-md" />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{product.price}/-</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(product.createdAt).toLocaleString()}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex items-center space-x-4">
                                                            <Link to={`/admin/product/${product._id}`} className="group">
                                                                <Edit />
                                                            </Link>
                                                            <button onClick={() =>handleDelete(product._id) } className="group">
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
                )
            }

            <Footer />
        </>
    );
};

export default ProductList;
