import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Close, Menu, PersonAdd, Search, ShoppingCart } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import UserDashboard from '../User/UserDashboard';
import { loadUser } from '../features/user/userSlice';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery,setSearchQuesry]=useState("");
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {user,isAuthenticated}=useSelector((state)=>state.user);
    const {cartItems}=useSelector((state)=>state.cart);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsSearchOpen(false); // auto close search when menu toggled
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

     const handleSearchSunmit=(e)=>{
        e.preventDefault();
        if(searchQuery.trim()){
            navigate(`/products?name=${encodeURIComponent(searchQuery.trim())}`)
        }
        else{
            navigate("/products");
        }
            setSearchQuesry("");
            setIsSearchOpen(false)

    }


    return (
        <nav className='fixed top-0 w-full bg-gray-800 shadow-sm z-50'>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between relative">

                {/* Logo */}
                <div className='flex-shrink-0'>
                    <Link to="/" className="text-2xl font-bold text-blue-400 no-underline transition hover:text-blue-500">
                        DMM Sarees
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className={`absolute top-16 left-0 right-0 bg-gray-800 px-4 py-4 border-t border-gray-700 shadow-md
                    md:static md:flex md:flex-1 md:ml-8 md:p-0 md:border-t-0 md:shadow-none md:bg-transparent
                    transition-all duration-300 ease-in-out ${isMenuOpen ? 'flex flex-col' : 'hidden'}`}>
                    
                    <ul className="flex flex-col md:flex-row gap-4 md:gap-10">
                        <li><Link to="/" className="text-gray-200 font-medium hover:text-blue-400">Home</Link></li>
                        <li><Link to="/products" className="text-gray-200 font-medium hover:text-blue-400">Products</Link></li>
                        <li><Link to="/aboutus" className="text-gray-200 font-medium hover:text-blue-400">About Us</Link></li>
                        <li><Link to="/contactus" className="text-gray-200 font-medium hover:text-blue-400">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4 md:gap-6 relative">

                    {/* Search Button */}
                    <button onClick={toggleSearch} className="text-gray-200 hover:text-blue-400 focus:outline-none">
                        <Search />
                    </button>

                    {/* Cart Icon */}
                    <Link to="/cart" className="relative text-gray-200 hover:text-blue-400">
                        <ShoppingCart className='text-2xl' />
                        <span className='absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-semibold min-w-[20px] h-5 rounded-full flex items-center justify-center px-1'>{cartItems.length}</span>
                    </Link>

                   {/* === USER PROFILE OR REGISTER ICON === */}
                    {isAuthenticated ? (
                        <UserDashboard user={user}/>
                    ) : (
                        <Link to="/register" className='text-gray-200 hover:text-blue-400'>
                            <PersonAdd className='text-2xl' />
                        </Link>
                    )}


                    {/* Hamburger */}
                    <div className="md:hidden cursor-pointer ml-2" onClick={toggleMenu}>
                        {isMenuOpen ? <Close className='text-2xl text-gray-200' /> : <Menu className='text-2xl text-gray-200' />}
                    </div>
                </div>
            </div>

            {/* Search Input (dropdown style for all screens) */}
            {isSearchOpen && (
                <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-sm bg-gray-800 border-t border-gray-700 px-4 py-2 md:top-16 md:right-auto z-40 shadow-md rounded-b-md">
                    <form className="flex items-center w-full" onSubmit={handleSearchSunmit}>
                        <input
                            type="text"
                            className='flex-1 px-3 py-1.5 rounded-l-md border border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none text-sm'
                            placeholder='Search products...'
                            value={searchQuery}
                            onChange={(e)=>setSearchQuesry(e.target.value)}
                        /> 
                        <button type="submit"   className='bg-blue-600 text-white px-4 py-1.5 rounded-r-md hover:bg-blue-700 text-sm'>
                            Search
                        </button>
                    </form>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
