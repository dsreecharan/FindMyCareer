import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Assessment from './pages/assessment/Assessment';
import Results from './pages/assessment/Results';
import Counseling from './pages/counseling/Counseling';
import Profile from './pages/user/Profile';
import AdminDashboard from './pages/admin/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route
              path="/assessment"
              element={
                <PrivateRoute>
                  <Assessment />
                </PrivateRoute>
              }
            />
            <Route
              path="/results"
              element={
                <PrivateRoute>
                  <Results />
                </PrivateRoute>
              }
            />
            <Route
              path="/counseling"
              element={
                <PrivateRoute>
                  <Counseling />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            
            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 