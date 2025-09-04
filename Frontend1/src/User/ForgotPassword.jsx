import React, { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassword, removeErrors, removeSuccess } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import Loader from '../components/loader';

const ForgotPassword = () => {


  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success, message } = useSelector((state) => state.user)

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword({ email }));
    setEmail("");
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
      toast.success(message, { position: "top-center", autoClose: 1000 });
      dispatch(removeSuccess());

    }
  }, [dispatch, success])



  return (
    <>
      <PageTitle title="Forgot Password" />
      <Navbar />
      {
        loading ? <Loader /> : (
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <main className="flex-grow flex items-center justify-center">
              <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg mx-4">

                {/* Title */}
                <h2 className="text-3xl font-bold text-center" style={{ color: '#4a235a' }}>
                  Forgot Password
                </h2>

                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>

                  {/* Email Input */}
                  <div>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </main>
          </div>
        )
      }
    </>
  )
}

export default ForgotPassword
