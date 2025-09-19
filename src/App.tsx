import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { BookingPage } from './pages/BookingPage';
import { PaymentPage } from './pages/PaymentPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { OperatorDashboard } from './pages/operator/OperatorDashboard';
import { SupportDashboard } from './pages/support/SupportDashboard';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="search" element={<SearchResultsPage />} />
                <Route path="booking/:busId" element={
                  <ProtectedRoute>
                    <BookingPage />
                  </ProtectedRoute>
                } />
                <Route path="payment" element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                } />
                <Route path="profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="admin/*" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Operator Routes */}
                <Route path="operator/*" element={
                  <ProtectedRoute requiredRole="operator">
                    <OperatorDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Support Routes */}
                <Route path="support/*" element={
                  <ProtectedRoute requiredRole="support">
                    <SupportDashboard />
                  </ProtectedRoute>
                } />
              </Route>
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;