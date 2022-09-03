import { useSelector } from 'react-redux';
import { Navigate, Route, useLocation } from 'react-router-dom';

const PrivateRoute = ({
    children}) => {
    let location = useLocation();
    const token = useSelector((state) => state.userAuth.loginInfo.token);

  
    // if (loading) {
    //   return <p className="container">Checking auth..</p>;
    // }
  
    const userHasRequiredRole = user && roles.includes(user.role) ? true : false;
  
    if (!token) {
      return <Navigate to="/signin" state={{ from: location }} />;
    }
  
    if (isAuthenticated && !userHasRequiredRole) {
      return <AccessDenied />; // build your won access denied page (sth like 404)
    }
  
    return children;
  };

  export default PrivateRoute