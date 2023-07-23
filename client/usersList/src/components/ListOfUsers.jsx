

import { Edit2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { delelteUser, getUsers } from '../api/endpoints';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


const ListOfUsers = () => {
    const [users, setUsers] = useState([]);
    
    
    useEffect(() => {
        getUsers().then((user) => {
            setUsers(user?.data?.users)

        })
    }, [])

    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        const isoDateString = new Date(dateString).toISOString();
        return new Date(isoDateString).toLocaleString(undefined, options);
    };

    const deleteUser = async (id) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await delelteUser(id);
                    toast.success('User deleted successfully');
                    getUsers()
                        .then((user) => {
                            setUsers(user?.data?.users);
                        })
                        .catch((error) => {
                            console.error('Error fetching users:', error);
                        });
                }
            })



        } catch (error) {
            toast.error('User deletion failed');
        }
    };

    return (
        <>
            <ToastContainer />

            <body className="antialiased font-sans">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">
                        <div>
                            <h2 className="text-lg font-semibold leading-tight">Users</h2>
                        </div>
                        <div className="my-2 flex sm:flex-row flex-col">
                            <div className="block relative">
                                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                                        <path
                                            d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                        </path>
                                    </svg>
                                </span>
                                <input placeholder="Search"
                                    className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                            </div>
                        </div>
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Username
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Created at
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users?.map((user) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <div className="flex items-center">
                                                                    <div className="ml-3">
                                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                                            {user?.username}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
                                                            </td>
                                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {formatDate(user?.createdAt)}
                                                                </p>
                                                            </td>
                                                            <td className="px-5 py-7 border-gray-200 bg-white text-sm flex justify-normal">
                                                                <Link to={`/users/${user?._id}`}>
                                                                    <Edit2 className="w-5 h-5 text-blue-500 cursor-pointer" />
                                                                </Link>
                                                                <Trash2 className="w-5 h-5 text-red-500 cursor-pointer ms-3" onClick={() => deleteUser(user?._id)} />
                                                            </td>
                                                        </tr></>

                                                )
                                            })
                                        }



                                    </tbody>
                                </table>
                                <div
                                    className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                                    <div className="inline-flex mt-2 xs:mt-0">
                                        <button
                                            className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                            Prev
                                        </button>
                                        <button
                                            className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </>
    )
}

export default ListOfUsers