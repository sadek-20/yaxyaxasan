import React from 'react';
import { redirect , Route, Routes, useRoutes } from 'react-router-dom';

const RouteGuard = ({ component: Component, allowed, redirect, ...rest }) => (
 <Routes><Route
    {...rest}
    render={(props) =>
      allowed ? (
        <Component {...props} />
      ) : (
        <redirect  to={redirect || '/'} />
      )
    }
  /></Routes> 
);

export default RouteGuard;
