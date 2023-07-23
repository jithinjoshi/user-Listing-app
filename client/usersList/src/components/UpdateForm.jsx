import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSingleUser, updateUser } from '../api/endpoints';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateForm = () => {
    const {id} = useParams();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [user,setUser] = useState([])
    useEffect(() => {
        getSingleUser(id)
            .then((response) => {
                const userData = response?.data;
                setUser(userData);
                setUsername(userData?.username);
                setEmail(userData?.email);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [id]);
    const navigate = useNavigate();
    
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const handleUsernameChange = (event) => {
        const { value } = event.target;
        setUsername(value);
        setUsernameError(value.length >= 3 ? '' : 'Username must be at least 3 characters long');
    };

    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(emailRegex.test(value) ? '' : 'Invalid email format');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (usernameError || emailError || !username || !email) {
            toast.error('Please fill the form correctly before submitting.');
            return;
        }

        // If all validations pass, you can proceed with adding the user.
        console.log('Username:', username);
        console.log('Email:', email);

        const data = await updateUser(id,{ username, email }).catch((err) => {
            console.log(err)
            toast.error(err)
        })
        
        if (data?.data) {
            toast.success('user updated successfully');
            setTimeout(() => {
                navigate('/');
              }, 2000);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="grid min-h-screen place-items-center">
                <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
                    <h1 className="text-xl font-semibold">Hello Admin, <span className="font-normal">please update the form</span></h1>
                    <form className="mt-6" onSubmit={handleSubmit}>

                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-600 uppercase">Username</label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="John Doe"
                                value={username}
                                onChange={handleUsernameChange}
                                className={`block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner ${usernameError ? 'border-red-500' : ''}`}

                            />
                            {usernameError && <p className="text-red-500 text-xs mt-1">{usernameError}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-600 uppercase">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="john.doe@company.com"
                                value={email}
                                onChange={handleEmailChange}
                                className={`block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner ${emailError ? 'border-red-500' : ''}`}

                            />
                            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                        </div>

                        <button type="submit" className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                            Update User
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateForm;