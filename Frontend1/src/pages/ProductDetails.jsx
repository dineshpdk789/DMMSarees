import React, { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/loader';
import { createReview, getProductDetails, removeErrors, removeSuccess } from '../features/products/productSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addItemsToCart, removeMessage } from '../features/cart/cartSlice';

const ProductDetails = () => {
    // --- All your existing hooks and state management ---
    const { product, error, loading, reviewSuccess, reviewLoading } = useSelector((state) => state.product);
    const { loading: cartLoading, error: cartError, success, message } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const [comment, setComment] = useState("");
    const [selectedImage, setSelectedImage] = useState("");

    // --- All your existing useEffects and helper functions ---
    useEffect(() => {
        if (id) {
            dispatch(getProductDetails(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (product?.image?.length > 0) {
            setSelectedImage(product.image[0].url);
        }
    }, [product]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(removeErrors());
        }
        if (cartError) {
            toast.error(cartError);
            dispatch(removeErrors());
        }
        if (success) {
            toast.success(message, { autoClose: 1000 });
            dispatch(removeMessage());
        }
        if (reviewSuccess) {
            toast.success("Review Submitted Successfully");
            setComment("");
            dispatch(removeSuccess());
            dispatch(getProductDetails(id));
        }
    }, [dispatch, error, cartError, success, message, reviewSuccess, id]);

    const handleAddToCart = () => dispatch(addItemsToCart({ id, quantity }));
    const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
    const increaseQuantity = () => product.stock > quantity && setQuantity(quantity + 1);
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        dispatch(createReview({ productId: id, comment }));
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <PageTitle title={`${product?.name || 'Product'} Details`} />
            <Navbar />
            
            <div className="bg-gray-50 py-8 md:py-19 px-4 sm:px-6 lg:px-8">
                {/* Main product container */}
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        
                        {/* Left Side: Image Gallery */}
                        <div className="flex-1 lg:sticky top-24 self-start">
                            <img
                                src={selectedImage}
                                alt={product?.name}
                                className="w-full h-auto max-h-[500px] object-contain rounded-lg bg-white shadow-md mb-4"
                            />
                            <div className="flex items-center justify-center gap-2 sm:gap-4">
                                {product?.image?.map((img) => (
                                    <img
                                        key={img.public_id}
                                        src={img.url}
                                        alt="Thumbnail"
                                        onClick={() => setSelectedImage(img.url)}
                                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover cursor-pointer border-2 transition-all ${
                                            selectedImage === img.url ? 'border-indigo-600' : 'border-gray-200 hover:border-indigo-400'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Product Information */}
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product?.name}</h1>
                            <p className="text-gray-500 mt-2 text-sm md:text-base">{product?.description}</p>
                            
                            <p className="text-2xl md:text-3xl font-light text-gray-800 my-4">₹{product?.price}/-</p>
                            
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <span>({product?.numOfReviews || 0} Reviews)</span>
                            </div>
                            
                            <p className={`my-4 font-semibold ${product?.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {product?.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                            </p>

                            {product?.stock > 0 && (
                                <>
                                    <div className="flex items-center gap-2 my-5">
                                        <span className="font-medium mr-2">Quantity:</span>
                                        <button onClick={decreaseQuantity} className="w-9 h-9 border rounded bg-gray-100">-</button>
                                        <input type="text" value={quantity} readOnly className="w-12 h-9 text-center border rounded" />
                                        <button onClick={increaseQuantity} className="w-9 h-9 border rounded bg-gray-100">+</button>
                                    </div>
                                    <button onClick={handleAddToCart} disabled={cartLoading} className="w-full bg-indigo-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-900 transition-colors">
                                        {cartLoading ? "Adding..." : "Add To Cart"}
                                    </button>
                                </>
                            )}

                            {/* Write a Review Form */}
                            <form className="bg-gray-100 p-6 rounded-lg mt-8" onSubmit={handleReviewSubmit}>
                                <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
                                <textarea
                                    placeholder="Write your review here..."
                                    className="w-full p-2 border rounded resize-y mb-3"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                ></textarea>
                                <button type="submit" disabled={reviewLoading} className="bg-indigo-800 text-white py-2 px-5 rounded hover:bg-indigo-900">
                                    {reviewLoading ? "Submitting..." : "Submit Review"}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Customer Reviews Section */}
                    <div className="mt-12 md:mt-16 pt-8 border-t">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
                        {product?.reviews && product.reviews.length > 0 ? (
                            <div className="space-y-6">
                                {product.reviews.map((review) => (
                                    <div key={review._id} className="border-b pb-4">
                                        <p className="font-semibold text-gray-800">{review.name}</p>
                                        <p className="text-gray-600 mt-1">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                        )}
                    </div>
                </div>
            </div>
            
            <Footer />
        </>
    );
};

export default ProductDetails;