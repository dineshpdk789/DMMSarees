import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ImageSlider from '../components/ImageSlider';
import Product from '../components/Product';
import PageTitle from '../components/PageTitle';
import { useSelector, useDispatch } from "react-redux";
import { getProduct, removeErrors } from '../features/products/productSlice';
import Loader from '../components/loader';
import {toast} from "react-toastify";

const Home = () => {

    const { loading, error, products, productCount } = useSelector((state) => state.product)
    const dispatch = useDispatch();

    //call api 
    useEffect(() => {
        dispatch(getProduct(""))
    }, [dispatch])

    //error dispatch
     useEffect(() => {
        if(error){
            
            toast.error(error,{position:"top-center",autoClose:1000});
            dispatch(removeErrors());
        }
    }, [dispatch,error])
    
    
    return (
        loading ? <Loader /> : <>

            <PageTitle title="Home-DMM Sarees" />
            <Navbar />
            <ImageSlider />
            <div className='p-8 text-gray-200 flex flex-col items-center justify-around mt-12'>
                <h2 className='text-4xl font-semibold mb-8 text-blue-700 text-center'>
                    Trending Now
                </h2>
            </div>
            <div className='flex flex-wrap gap-6 justify-center w-full max-w-screen-xl mx-auto p-4 lg:gap-8 px-6'>
                {
                    products?.map((product, index) => (
                        <Product product={product} key={index} />
                    ))
                }
            </div>
            <Footer />
        </>

    );
};

export default Home;