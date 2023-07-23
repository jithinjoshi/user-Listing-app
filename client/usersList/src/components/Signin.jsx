import { useState } from "react";
import authApi from "../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addAccessTokenToken, setLoading } from "../redux/appSlice";
import { useDispatch } from "react-redux";

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Please enter your Email address");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid Email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please enter your Password");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must contain at least six characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };
  const dispatch = useDispatch()

  const handleLogin = async () => {
    const isValid = validateInputs();

    if (isValid) {
      try {
        console.log(email,password)
        const data  = await authApi.post("auth/signin", { email, password });
        console.log(data)
        if (data?.data) {
          toast.success('Login successful!');
          (async () => {
            dispatch(setLoading(true))
            try {
              const {
                data: { accessToken },
              } = await authApi.get("auth/refresh");
              dispatch(addAccessTokenToken(accessToken));
            } catch (error) {
              // 
            } finally {
              dispatch(setLoading(false))
            }
          })();
          navigate("/");
        } else {
          toast.error('Invalid credentials. Please check your email and password.');
        }
      } catch (error) {
        toast.error('An error occurred during login. Please try again later.');
        console.error(error);
      }
    }
  };

  return (
    <section>
      <ToastContainer />
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9377/9377920.png"
              alt="todo image"
              className="h-16"
            />
          </div>

          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in your account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            I dont have any Account
            <Link
              to="/signup"
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <form  className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && <p className="text-red-500">{emailError}</p>}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && <p className="text-red-500">{passwordError}</p>}
                </div>
              </div>
              <div>
                <button
                  onClick={handleLogin}
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}