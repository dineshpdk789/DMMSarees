import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeErrors, removeSuccess, removeupdateSuccess, updatePassword } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Loader from '../components/loader';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const UpdatePassword = () => {



  const {updateSuccess,loading,error}=useSelector((state=>state.user));
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const[showpassword1,setShowpassword1]=useState(false)
  const[showpassword2,setShowpassword2]=useState(false)
  const[showpassword3,setShowpassword3]=useState(false)


  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldpassword", oldPassword);
    myForm.set("newpassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));

  }
   

   //handling erroro and success message 
    useEffect(() => {
      if (error) {
        toast.error(error, { autoClose: 1000 });
        dispatch(removeErrors());
      }
      if (updateSuccess) {
        toast.success("Password updated successfully", { autoClose: 1000 });
        dispatch(removeupdateSuccess());
        navigate("/profile");
      }
    }, [error, dispatch, updateSuccess]);
  
  return (
    <div>
      <Navbar/>
      {
        loading?<Loader/>:(
          <div className="bg-gray-50 min-h-screen flex items-center justify-center font-sans">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">

          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-gray-800" style={{ color: '#4a235a' }}>
            Update Password
          </h2>

          {/* Form */}
          <form className="space-y-6" onSubmit={updatePasswordSubmit}>

            {/* Old Password Input */}
            <div className="relative">
              <input
                id="old-password"
                name="oldPassword"
                type={showpassword1?"text":"password"}
                className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                placeholder="Old Password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                onClick={()=>setShowpassword1(!showpassword1)}
              >
               {showpassword1?<Visibility/>:<VisibilityOff/>}
              </button>
            </div>

            {/* New Password Input */}
            <div className="relative">
              <input
                id="new-password"
                name="newPassword"
               type={showpassword2?"text":"password"}
                className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                onClick={()=>setShowpassword2(!showpassword2)}
              >
               {showpassword2?<Visibility/>:<VisibilityOff/>}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                id="confirm-password"
                name="confirmPassword"
                type={showpassword3?"text":"password"}
                className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                onClick={()=>setShowpassword3(!showpassword3)}
              >
                {showpassword3?<Visibility/>:<VisibilityOff/>}
              </button>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 font-semibold text-white rounded-lg transition-colors duration-300"
                style={{
                  backgroundColor: '#4a235a',
                  '--tw-ring-color': '#c084fc'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5b2c6f'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4a235a'}
              >
                Update Password
              </button>
            </div>

          </form>
        </div>
      </div>

        )
      }
    </div>
  )
}

export default UpdatePassword
