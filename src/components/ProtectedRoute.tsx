import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;