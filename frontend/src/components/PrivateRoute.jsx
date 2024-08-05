import { Navigate,Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

// const PrivateRoute = ({ element: Component, isAuthenticated, ...rest }) => {
//   return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
// };


export default PrivateRoute;