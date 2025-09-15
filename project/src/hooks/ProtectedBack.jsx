import { userData } from "./UserData";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedBack = ({ children }) => {
  let location = useLocation();

  if (userData?.token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

ProtectedBack.propTypes = {
  children: PropTypes.element,
};

export default ProtectedBack;
