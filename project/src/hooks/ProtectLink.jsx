import {Navigate, useLocation} from "react-router-dom"
import PropTypes from 'prop-types';
const ProtectLinks = ({children}) => {

    const user = JSON.parse(localStorage.getItem('user'));


    let location = useLocation();

    const userRoutes = ['/']; 
    const editorRoutes = []; 
    const adminRoutes = [ '/users/entrepreneurs']; 
    const generalAdminRoutes = ['/', '/users/providers']; 


    const isUserRoute = userRoutes.some(path => location.pathname.includes(path));
    const isEditorRoute = editorRoutes.some(path => location.pathname.includes(path));
    const isAdminRoute = adminRoutes.some(path => location.pathname.includes(path));
    const isGeneralAdminRoute = generalAdminRoutes.some(path => location.pathname.includes(path));

    // const isAdminRoute = adminRoutes.some(path => {
    //     console.log("Checking admin route:", path);
    //     return location.pathname.includes(path);
    // });


    if (user?.type === 'user' && !isUserRoute) {
        return <Navigate to="/" />;
    }

    if (user?.type === 'editor' && !isEditorRoute) {
        return <Navigate to="/" />;
    }

    if (user?.type === 'admin' && !isAdminRoute) {
        console.log("object")
        return <Navigate to="/" />;
    }

    if (user?.type === 'general admin' && !isGeneralAdminRoute) {
        return <Navigate to="/" />;
    }
  
        //  if (user?.type !== 'general admin') {
        // return <Navigate to="/" />;
        // }
   
 return children

};

ProtectLinks.propTypes = {
    children: PropTypes.element
  };


export default ProtectLinks;