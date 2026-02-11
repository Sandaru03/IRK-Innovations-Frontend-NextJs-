import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdminRoute = () => {
  const token = localStorage.getItem('adminToken');

  return token ? <Outlet /> : <Navigate to="/adminlogin" replace />;
};

export default ProtectedAdminRoute;
