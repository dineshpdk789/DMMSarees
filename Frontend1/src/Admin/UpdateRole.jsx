import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser, removeErrors, removeSuccess, updateRole } from '../features/admin/adminSlice';
import { toast } from 'react-toastify';



const UpdateRole = () => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const { user, updateSuccess, loading, error } = useSelector((state) => state.admin);
    

    const navigate=useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams(); // Get user ID from URL in a real app


    // Simulating API call
    useEffect(() => {
        dispatch(getSingleUser(id));
    }, [dispatch,id])


    // render  previous data
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateRole({id,role}));
    };

   //handle error and success
      useEffect(() => {
            if (error) {
                toast.error(error, { autoClose: 1000 });
                dispatch(removeErrors());
            }
            if (updateSuccess) {
                toast.success("User role updated successfully", { autoClose: 1000 });
                dispatch(removeSuccess());
                navigate("/admin/getallusers")
            }
        }, [error, dispatch, updateSuccess]);

    return (
        <>
            <>
                <Navbar />
                <PageTitle title="Update User Role" />

                <div className="bg-gray-50 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
                            Update User Role
                        </h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                                    disabled // Name is typically not editable here
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                                    disabled // Email is typically not editable here
                                />
                            </div>

                            {/* Role Select Field */}
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                    required
                                >
                                    <option value="">Select Role</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                                >
                                    Update Role
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <Footer />
            </>
        </>
    )
}

export default UpdateRole
