import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeErrors, removeSuccess, removeupdateSuccess, updateProfile } from '../features/user/userSlice';
import Loader from '../components/loader';

const UpdateProfile = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("./images/profile.jpeg");


  const { user, error, updateSuccess, message, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const profileImageUpdate = (e) => {
      const file = e.target.files[0];
            if (file) {
                setAvatar(file); // Store the actual file
                setAvatarPreview(URL.createObjectURL(file)); // Create a temporary preview
            }
  }


  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
  
    dispatch(updateProfile(myForm));
  }


  //handling error and success message 
  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 1000 });
      dispatch(removeErrors());
    }
    if (updateSuccess) {
      toast.success("Profile updated successfully", { autoClose: 1000 });
      dispatch(removeupdateSuccess());
      navigate("/profile");
    }
  }, [error, dispatch, updateSuccess]);

   //popup data 
   useEffect(()=>{
    if(user){
        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar?.url || "./images/profile.jpeg");
    }
   },[user])

  return (
    <>
      <Navbar />
      {
        loading ? <Loader /> : (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">

            {/* Form container with card styling */}
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">

              {/* Heading */}
              <h2 className="text-3xl font-bold text-center text-gray-800">
                Update Profile
              </h2>

              {/* Form element */}
              <form className="space-y-6" onSubmit={updateSubmit}>

                {/* Avatar and File Input Section */}
                <div className="flex flex-col items-center space-y-4">
                  {/* Image Preview */}
                  <img
                    src={avatarPreview}
                    alt="Current Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  />
                  {/* Custom File Input */}
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="avatar-upload"
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      Update Photo
                    </label>
                    <input
                      id="avatar-upload"
                      name="avatar"
                      type="file"
                      className="hidden"
                      onChange={profileImageUpdate}
                    />
                  </div>
                </div>

                {/* Name Input Field */}
                <div>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Email Input Field */}
                <div>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Update Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
                    
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>

        )
      }
    </>
  )
}

export default UpdateProfile
