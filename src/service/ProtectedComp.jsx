import React from 'react';
import { Outlet } from 'react-router-dom';

const ProtectedComp = ({ login }) => {
    return login ? <Outlet /> : false;
}

export default ProtectedComp;
