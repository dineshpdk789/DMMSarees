import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteReview, fetchProductReviews, removeErrors, removeMessage, removeSuccess } from '../features/admin/adminSlice'
import { toast } from 'react-toastify'
import { Delete } from '@mui/icons-material'

const SingleProductReview = () => {
    const { reviews, loading, error, success,message } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const { id } = useParams();
    //api call to get review
    useEffect(() => {
        dispatch(fetchProductReviews(id));
    }, [dispatch])

    //handle fetch product error
    useEffect(() => {
        if (error) {
            toast.error(error, { autoClose: 1000, toastId: "review" });
            dispatch(removeErrors());
        }
    }, [dispatch, error])

    const handleDelete = (reviewId) =>{
        if (window.confirm("Are you sure you want to delete this review?")) {
            dispatch(deleteReview({ productid: id, reviewId }));
        }
    };
    //handle productreview error
    useEffect(() => {
        if (error) {
            toast.error(error, { autoClose: 1000, toastId: "review" });
            dispatch(removeErrors());
        }
        if(success){
             toast.success(message, { autoClose: 1000, toastId: "review" });
            dispatch(removeSuccess());
            dispatch(removeMessage());
        }
    }, [dispatch, error,success,message])


    return (
        <>
            <Navbar />
            <PageTitle title="Product Reviews" />

            <div className="bg-gray-50 py-22 px-4 sm:px-6 lg:px-8 min-h-[60vh]">
                <h1 className='text-center  text-4xl font-medium uppercase py-5 underline'>Reviews For Product</h1>
                <div className="max-w-4xl mx-auto">
                    {reviews && reviews.length > 0 ? (
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-800">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sl No</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">User Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Comment</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {reviews.map((review, index) => (
                                            <tr key={review._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{review.name}</td>
                                                <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">{review.comment}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <button onClick={() => handleDelete(review._id)} className="text-red-600 hover:text-red-800 transition-colors">
                                                        <Delete />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h2 className="text-xl font-semibold text-gray-600">No Reviews Found for This Product</h2>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default SingleProductReview
