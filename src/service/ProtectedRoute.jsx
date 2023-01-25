import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ login }) => {
    
    return login ? <Outlet /> : <Navigate to={'/login'} />

}

export default ProtectedRoute;
