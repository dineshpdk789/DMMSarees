import React, { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, removeErrors } from '../features/products/productSlice'
import { toast } from 'react-toastify'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import Noproduct from '../components/Noproduct'
import Pagination from '@mui/material/Pagination'
import Loader from '../components/loader';
import Product from '../components/Product'

const Products = () => {
    const { loading, error, products, resultsPerPage, productCount } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    //search
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get("name");
    //pagination
    const pageFromURL = parseInt(searchParams.get("page"), 10) || 1;
    const [currentPage, setCurrentPage] = useState(pageFromURL);
    //category filter
    const categories = ["Traditional Zari Sarees","Banaras Sarees","Contrast Border Sarees","Double Side Kuttu Sarees","Single Side Kuttu Sarees","Broket Sarees","Animal & Bird Motif Sarees","Upada Sarees","Temple Border Sarees","Silk Sarees","Kanchi Border Fusion Sarees","Wedding Collection Sarees","Pure handloom","powerloom"];
    const category = searchParams.get("category");


    // call api
    useEffect(() => {
        dispatch(getProduct({ keyword, page: currentPage, category }))
    }, [dispatch, keyword, currentPage, category])

    // error dispatch
    useEffect(() => {
        if (error) {
            toast.error(error, { position: "top-center", autoClose: 1000 });
            dispatch(removeErrors());
        }
    }, [dispatch, error])



    const handlePageChnage = (page) => {
        if (page !== currentPage) {
            setCurrentPage(page);
        }
        const newSearchParams = new URLSearchParams(location.search);

        if (page === 1) {
            newSearchParams.delete('page');
        } else {
            newSearchParams.set('page', page);
        }
        navigate(`/products?${newSearchParams.toString()}`);
    }

    //handle category
     const handleCategoryClick=(category)=>{
        const newSearchParams=new URLSearchParams(location.search);
        newSearchParams.set("category",category);
        // newSearchParams.delete("Page");
        navigate(`/products?${newSearchParams.toString()}`)
     }





    if (loading) {
        return (
            <>
                <PageTitle title="All Products" />
                <Navbar />
                <Loader/>
                <Footer />
            </>
        )
    }

    return (
        <>
            <PageTitle title="All Products" />
            <Navbar />
            <div className="flex flex-col md:flex-row gap-5 px-5 mt-[100px]">
                <div className="flex-shrink-0 w-full md:w-[250px] bg-[var(--text-light)] p-5 rounded-lg shadow-md">
                    <h3 className="text-[var(--primary-dark)] mb-4 text-lg font-semibold tracking-wide uppercase">Categories</h3>

                    <ul className="space-y-2">
                        {categories.map((category) => (
                            <li
                                key={category}
                                className="cursor-pointer text-gray-700 hover:bg-white hover:shadow-sm hover:pl-2 transition-all rounded px-2 py-1"
                                onClick={()=>handleCategoryClick(category)}
                            >
                                {category.toUpperCase()}
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="flex-1 flex flex-col gap-4">
                    {
                        products.length > 0 ? (<div className="flex flex-wrap gap-6 justify-center">
                            {products.map((product, index) => (
                                <Product key={index} product={product} />
                            ))}
                        </div>) : <Noproduct keyword={keyword} />
                    }
                    {/* <Pagination currentPage={currentPage} onPageChange={handlePageChnage} /> */}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Products
