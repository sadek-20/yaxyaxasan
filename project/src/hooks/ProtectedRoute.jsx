import {Navigate, useLocation} from "react-router-dom"
import PropTypes from 'prop-types';
import { userData } from "./UserData"

const ProtectedRoute = ({children}) => {
    
    let location = useLocation();

    if(!userData) {
        return <Navigate to="/login" state={{ from: location}} replace />;
    }
 return children

};

ProtectedRoute.propTypes = {
    children: PropTypes.element
  };


export default ProtectedRoute;