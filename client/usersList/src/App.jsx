import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Signup } from "./components/signup"
import ErrorPage from "./components/ErrorPage"
import { Signin } from "./components/Signin"
import ListOfUsers from "./components/ListOfUsers"
import AddUser from "./components/AddUser"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addAccessTokenToken, setLoading } from "./redux/appSlice"
import authApi from "./api/axiosInstance"
import Layout from "./components/Layout"
import UpdateForm from "./components/UpdateForm"
import ProtectedRoute from "./utils/protectedRoute"



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:
      [{
        path: '/signup',
        element: <Signup />,
        errorElement: <ErrorPage />
      },
      {
        path: '/signin',
        element: <Signin />,
        errorElement: <ErrorPage />
      },
      {
        path: '/',
        element: <ProtectedRoute><ListOfUsers /></ProtectedRoute> ,
        errorElement: <ErrorPage />,
      },
      {
        path: '/adduser',
        element:<ProtectedRoute><AddUser /></ProtectedRoute>,
        errorElement: <ErrorPage />,
         
      },
    {
      path:'/users/:id',
      element:<ProtectedRoute><UpdateForm/></ProtectedRoute>,
      errorElement: <ErrorPage />,
      
    }]
  }
])


function App() {

  const dispatch = useDispatch();
  const token = useSelector(state => state.app.accessToken)
  
  useEffect(() => {
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
  }, [token]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App