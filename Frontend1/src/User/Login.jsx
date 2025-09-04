import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, removeErrors, removeSuccess } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import { loadCartForUser } from '../features/cart/cartSlice';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { success, loading, error, isAuthenticated } = useSelector((state) => state.user);

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email: loginEmail, password: loginPassword }));
    };

    // Effect for handling error messages
    useEffect(() => {
        if (error) {
            toast.error(error, { position: "top-center", autoClose: 500 });
            dispatch(removeErrors());
        }
    }, [dispatch, error]);

    // Effect for handling success messages
    useEffect(() => {
        if (success) {
            toast.success("Login Successful", { position: "top-center", autoClose: 500, toastId: "login" });
            dispatch(removeSuccess());
            // Load user cart after successful login
            dispatch(loadCartForUser(JSON.parse(localStorage.getItem("user"))));
        }
    }, [dispatch, success, navigate]);

    // Effect for redirecting if the user is already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    });

    return (
        // --- ✨ Main background container (Matches Register page) ---
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100">

            {/* --- ✨ Card container (Matches Register page) --- */}
            <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">

                {/* The form element itself */}
                <form className="space-y-6" onSubmit={loginSubmit}>

                    {/* --- ✨ Form Header (Matches Register page) --- */}
                    <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Sign In
                    </h2>

                    {/* --- ✨ Email Input (Matches Register page) --- */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    {/* --- ✨ Password Input with Icon (Matches Register page) --- */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            className="rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                        />
                        {/* Toggle Button */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </button>
                    </div>

                    {/* --- ✨ Submit Button (Matches Register page) --- */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"}`}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                    {/* --- ✨ Links (Matches Register page styling) --- */}
                    <div className="text-sm text-center text-gray-600 space-y-2">
                        <p>
                            Forgot your password?{' '}
                            <Link to="/forgotpassword" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Reset Here
                            </Link>
                        </p>
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;