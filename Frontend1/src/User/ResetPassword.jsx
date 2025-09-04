import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { removeErrors, removeSuccess, resetPassword } from '../features/user/userSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const ResetPassword = () => {


    const [password,setpassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const { loading, error, success, message } = useSelector((state) => state.user)
    const {token}=useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const handleSubmit=(e)=>{
                e.preventDefault();
                const data={
                  password:password,
                  confirmPassword:confirmPassword
                }
                
                dispatch(resetPassword({token:token,userData:data}))
                
    }

     //error message
      useEffect(() => {
        if (error) {
          toast.error(error, { position: "top-center", autoClose: 1000 });
          dispatch(removeErrors());
        }
      }, [dispatch, error])
    
      //success message 
      useEffect(() => {
        if (success) {
          toast.success("Password reset successful", { position: "top-center", autoClose: 1000 });
          dispatch(removeSuccess());
          navigate("/login");
        }
      }, [dispatch, success])
    


  return (
  <>
      <PageTitle title="Forgot Password" />
            <Navbar />
                <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
                  <main className="flex-grow flex items-center justify-center">
                    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg mx-4">
      
                      {/* Title */}
                      <h2 className="text-3xl font-bold text-center" style={{ color: '#4a235a' }}>
                        Reset Password
                      </h2>
      
                      {/* Form */}
                      <form className="space-y-6" onSubmit={handleSubmit}>
      
                        {/* new password */}
                        <div>
                          <input
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                            placeholder=" new password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                          />
                        </div>

                         {/* confirm password */}
                        <div>
                          <input
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                            placeholder="confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
      
                        {/* Submit Button */}
                        <div>
                          <button
                            type="submit"
                            className="w-full px-4 py-3 font-semibold text-white rounded-lg transition-colors duration-300 ease-in-out"
                            style={{ backgroundColor: '#4a235a' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5b2c6f'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4a235a'}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </main>
                </div>
  </>
  )
}

export default ResetPassword
