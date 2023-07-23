
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"


const ProtectedRoute = ({ children }) => {
    const accessToken = useSelector((state) => state?.app?.accessToken);
    const isLoading = useSelector((state) => state.app.isLoading);

    let location = useLocation();

    console.log(accessToken, isLoading)

    if (!accessToken && !isLoading) {
        return <Navigate to="/signin" state={{ from: location }} replace />
    }
    return <>{children}</>

};

export default ProtectedRoute;