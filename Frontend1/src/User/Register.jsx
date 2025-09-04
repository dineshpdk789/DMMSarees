import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { register, removeErrors, removeSuccess } from '../features/user/userSlice';
import { Visibility, VisibilityOff } from '@mui/icons-material';



const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false);

    // for Send image data to backend
    const [avatar, setAvatar] = useState("");
    // for Display image in the form
    const [avatarPreview, setAvatarpreview] = useState("/images/profile.jpeg");
    const { name, email, password } = user;

    const { success, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    // Handle input changes
    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const file = e.target.files[0];
            if (file) {
                setAvatar(file); // Store the actual file
                setAvatarpreview(URL.createObjectURL(file)); // Create a temporary preview
            }
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    //function for submitting form
    const registerSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error("Please fill out thre required fields", { autoClose: 1000 })
            return;
        }
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);

        //dispatching register function
        dispatch(register(myForm));

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
            toast.success("Registration Successful", { position: "top-center", autoClose: 1000 });
            dispatch(removeSuccess());
            navigate("/login")
        }
    }, [dispatch, success])




    return (
        <div className="min-h-screen flex items-center justify-center p-4 
        bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100">

            {/* Card container */}
            <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 
            p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">

                <form className="space-y-6" onSubmit={registerSubmit} encType="multipart/form-data">

                    <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Sign Up
                    </h2>

                    {/* Username Input */}
                    <div>
                        <input
                            type="text"
                            placeholder='Username'
                            name="name"
                            className="rounded-md block w-full px-4 py-3 border border-gray-300 
                        placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 
                        focus:border-indigo-500 sm:text-sm"
                            value={name}
                            onChange={registerDataChange}
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <input
                            type="email"
                            placeholder='Email'
                            name="email"
                            className="rounded-md block w-full px-4 py-3 border border-gray-300 
                        placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 
                        focus:border-indigo-500 sm:text-sm"
                            value={email}
                            onChange={registerDataChange}
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            className="rounded-md block w-full px-4 py-3 border border-gray-300 
                        placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 
                        focus:border-indigo-500 sm:text-sm pr-10"
                            value={password}
                            onChange={registerDataChange}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </button>
                    </div>

                    {/* Avatar Upload */}
                    <div className="flex items-center space-x-4">
                        <img
                            src={avatarPreview}
                            alt="Avatar Preview"
                            className="w-16 h-16 rounded-full object-cover border border-gray-300 shadow-sm"
                        />
                        <label htmlFor="avatar-upload" className="cursor-pointer bg-white py-2 px-4 border border-gray-300 
                        rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none 
                        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Upload Photo
                        </label>
                        <input
                            id="avatar-upload"
                            type="file"
                            name="avatar"
                            className='sr-only'
                            accept='image/*'
                            onChange={registerDataChange}
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent 
                            text-sm font-medium rounded-md text-white 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"}`}
                        >
                            {loading ? "Creating... Account" : "Create Account"}
                        </button>
                    </div>

                    {/* Sign In Link */}
                    <p className='text-sm text-center text-gray-600'>
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register
