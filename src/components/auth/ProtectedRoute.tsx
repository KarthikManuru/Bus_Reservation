import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute - User:', user?.id);
  console.log('ProtectedRoute - Profile:', profile);
  console.log('ProtectedRoute - Required Role:', requiredRole);
  console.log('ProtectedRoute - User Role:', profile?.role);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!user) {
    console.log('No user found, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && profile?.role !== requiredRole) {
    console.log(`Access denied: Required role '${requiredRole}', but user has role '${profile?.role}'`);
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}