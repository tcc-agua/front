import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useUtilsStore from '../../store/utils';

interface PrivateRouteProps {
  isAuthenticated: boolean;
  loading: boolean; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, loading }) => {
  const { token } = useUtilsStore();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (token != null || isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
