import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Adjust path as needed
import PageTitle from '../components/PageTitle'; // Adjust path as needed
import Footer from '../components/Footer'; // Adjust path as needed
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUsers, removeErrors, removeSuccess } from '../features/admin/adminSlice';
import { toast } from 'react-toastify';
import Loader from '../components/loader';





const UserList = () => {

    const { users, loading, deleteError,deletesuccess,error } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    console.log(users);

    //api call
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch])

    //handling error 
    useEffect(() => {
        if (error) {
            toast.error("Failed to fetch users", { position: "top-center", autoClose: 1000 });
            dispatch(removeErrors());
        }
    }, [dispatch, error])


    const handleDelete = (userid) => {
       const confirm=window.confirm("Are you sure to delete the user");
       if(confirm){
         dispatch(deleteUser(userid))
       }
    }
    //handle error and success
    useEffect(() => {
        if (deleteError) {
            toast.error(" failed to  delete user", { autoClose: 1000 });
            dispatch(removeErrors());
        }
        if (deletesuccess ) {
            toast.success("User deleted successfully", { autoClose: 1000 });
            dispatch(removeSuccess());
        }
    }, [deleteError, dispatch, deletesuccess]);

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <Navbar />
            <PageTitle title="All Users" />

            <div className="bg-gray-50 py-22 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                {/* Table Header */}
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sl No</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Created At</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user, index) => (
                                        <tr key={user._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`font-semibold ${user.role === 'admin' ? 'text-green-600' : 'text-blue-600'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-4">
                                                    <Link to={`/admin/user/${user._id}`} className="group">
                                                        <Edit />
                                                    </Link>
                                                    <button onClick={() => handleDelete(user._id)} className="group">
                                                        <Delete />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default UserList;
