import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, removeErrors, removeSuccess, clearStatus } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import CartItems from '../cart/CartItem';


const UserDashboard = ({ user }) =>{
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success, loading, error, status } = useSelector((state) => state.user);
  const{cartItems}=useSelector((state)=>state.cart)

  const handleuderorders = (e) => {
    navigate("/orders/user")
  }
  const handleUserProfile = () => {
    navigate("/profile")
  }
  const handleCart = () => {
    navigate("/cart")
  }
  const handleAdminDashboard = () => {
    navigate("/admin/dashboard")
  }
  const handleLogout = () => {
    dispatch(logout()).unwrap().then(() => {
      toast.success("Logout successful",{autoClose:500});
      dispatch(removeSuccess());
      navigate("/login");
    })
      .catch((error) => {
        toast.error(error.message || "login failed");
        dispatch(removeErrors);
      })

  }


  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-transparent text-white focus:outline-none"
      >
        <img
          src={user.avatar?.url ? user.avatar?.url : "./images/Profile.jpeg"}
          alt="Profile"
          className="w-7 h-7 rounded-full object-cover border border-white"
        />
        <span className="hidden sm:inline text-white font-semibold">{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 p-2 rounded-lg shadow-lg z-50">
          <div className="flex flex-col gap-2">
            <button
              className="text-gray-200 text-left hover:bg-gray-700 px-4 py-2 rounded"
              onClick={handleuderorders}
            >
              Orders
            </button>
            <button
              className="text-gray-200 text-left hover:bg-gray-700 px-4 py-2 rounded"
              onClick={handleUserProfile}
            >
              Profile
            </button>
            {user.role === 'admin' && (
              <button
                className="text-gray-200 text-left hover:bg-gray-700 px-4 py-2 rounded"
                onClick={handleAdminDashboard}
              >
                Admin Dashboard
              </button>
            )}
            <button
              className={`${CartItems.length ? "text-green-300" : "text-gray-200"} text-left hover:bg-gray-700 px-4 py-2 rounded`}
              onClick={handleCart}
            >
              Cart({cartItems.length})
            </button>
            <button
              className="text-gray-200 text-left hover:bg-gray-700 px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
