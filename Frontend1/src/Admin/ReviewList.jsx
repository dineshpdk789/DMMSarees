import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts } from '../features/admin/adminSlice';
import Loader from '../components/loader';



const ReviewList = () => {

    const { products, loading, error } = useSelector((state) => state.admin);

    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAdminProducts());
    }, [dispatch])

    if (loading) {
        return (
            <Loader />
        )
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
            <PageTitle title="Product Reviews" />

            <div className="bg-gray-50 py-22 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                {/* Table Header */}
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sl No</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product Image</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Number of Reviews</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product, index) => (
                                        <tr key={product._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>

                                            {/* FIX: Using product.name */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.name}</td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {/* FIX: Accessing the first image URL from the image array */}
                                                <img src={product.image[0].url} alt={product.name} className="h-16 w-16 object-cover rounded-md" />
                                            </td>

                                            {/* FIX: Using product.numOfReviews */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.numofReviews}</td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link
                                                    to={`/admin/reviews/${product._id}`}
                                                    className={`
                                                    py-2 px-4 rounded-md text-sm font-medium transition-colors
                                                    ${product.numofReviews === 0
                                                            ? 'bg-gray-200 text-gray-400 disabled cursor-not-allowed'
                                                            : 'bg-gray-800 text-white hover:bg-gray-900'
                                                        }
                          `}
                                                    onClick={(e) => {
                                                        if (product.numofReviews === 0) {
                                                            e.preventDefault(); // This stops the navigation
                                                        }
                                                    }}
                                                >
                                                    View Reviews
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

            <Footer />
        </>
    );
};

export default ReviewList;