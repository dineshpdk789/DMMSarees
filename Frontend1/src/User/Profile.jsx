import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {useSelector} from "react-redux"
import Loader from '../components/loader';
import PageTitle from '../components/PageTitle';

function Profile() {

   const {loading,isAuthenticated,user}=useSelector((state)=>state.user);
   console.log(user);
   const navigate=useNavigate();
   useEffect(()=>{
    if(isAuthenticated===false){
        navigate("/login")
    }
   },[isAuthenticated])
    
  return (
    <>
    <Navbar />
      {/* Show a loading message while user data is being fetched */}
      {loading ? (
       <Loader/>
      ) : (
        // Only render the profile content if the user object exists
        
        user && (
          <div className="max-w-2xl my-8 mx-auto p-4 rounded-2xl shadow-lg md:p-6">
             <PageTitle title={`${user.name} Profile`}/>
            {/* Top section container */}
            <div className="text-center bg-gradient-to-br from-slate-50 to-white rounded-2xl mb-8 p-6">
              <h1 className="text-2xl md:text-3xl text-gray-800 my-6 font-semibold tracking-tight">My Profile</h1>
              
              {/* Safely access avatar URL */}
              <img 
                src={user.avatar?.url ? user.avatar.url :"/images/profile.jpeg"}
                alt="User Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md my-4 mx-auto mb-6 block transition-transform duration-300 ease-in-out hover:scale-105" 
              />
              
              <Link 
                to="/updateprofile"
                className="inline-block py-2 px-6 bg-blue-600 text-white rounded-full no-underline font-medium transition-all duration-300 ease-in-out shadow-lg hover:bg-blue-700 hover:-translate-y-0.5"
              >
                Edit Profile
              </Link>
            </div>

            {/* Details container */}
            <div className="p-4 md:p-6 bg-slate-50 rounded-2xl my-6">
              <div className="flex flex-col md:flex-row md:items-center p-4 mb-4 bg-white rounded-xl transition-all duration-300 ease-in-out shadow-sm hover:translate-x-1 hover:shadow-md">
                <h2 className="text-md text-slate-500 w-32 font-medium mb-1 md:mb-0">Username:</h2>
                <p className="text-md text-gray-800 font-medium md:pl-4">{user.name}</p>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center p-4 mb-4 bg-white rounded-xl transition-all duration-300 ease-in-out shadow-sm hover:translate-x-1 hover:shadow-md">
                <h2 className="text-md text-slate-500 w-32 font-medium mb-1 md:mb-0">Email:</h2>
                <p className="text-md text-gray-800 font-medium md:pl-4">{user.email}</p>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center p-4 bg-white rounded-xl transition-all duration-300 ease-in-out shadow-sm hover:translate-x-1 hover:shadow-md">
                <h2 className="text-md text-slate-500 w-32 font-medium mb-1 md:mb-0">Joined on:</h2>
                {/* Safely format the date */}
                <p className="text-md text-gray-800 font-medium md:pl-4">{user.createdAt ? String(user.createdAt).substring(0, 10) : "N/A"}</p>
              </div>
            </div>

            {/* Action buttons section */}
            <div className="flex flex-col md:flex-row items-center gap-4 justify-center mt-8">
              <Link 
                to="/orders/user" 
                className="w-full md:w-auto text-center py-3 px-6 bg-blue-600 text-white no-underline rounded-lg transition-all duration-300 font-medium shadow-md hover:bg-slate-800 hover:-translate-y-0.5"
              >
                My Orders
              </Link>
              <Link 
                to="/updatepassword" 
                className="w-full md:w-auto text-center py-3 px-6  bg-blue-600 text-white no-underline rounded-lg transition-all duration-300 font-medium shadow-md hover:bg-slate-800 hover:-translate-y-0.5"
              >
                Change Password
              </Link>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default Profile;
