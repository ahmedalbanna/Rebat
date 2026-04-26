/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import StudentLayout from './layouts/StudentLayout';
import StudentDashboard from './pages/student/Dashboard';
import Subscribe from './pages/student/Subscribe';
import StudentTrips from './pages/student/Trips';
import StudentSchedule from './pages/student/Schedule';
import StudentBilling from './pages/student/Billing';
import DriverLayout from './layouts/DriverLayout';
import DriverDashboard from './pages/driver/Dashboard';
import DriverTrips from './pages/driver/Trips';
import DriverEarnings from './pages/driver/Earnings';
import DriverSettings from './pages/driver/Settings';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminFinance from './pages/admin/Finance';
import AdminTrips from './pages/admin/Trips';
import AdminSettings from './pages/admin/Settings';
import StudentSettings from './pages/student/Settings';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
}

function RoleBasedRoute() {
  const { userData, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  
  if (userData?.role === 'student') return <Navigate to="/student" />;
  if (userData?.role === 'driver') return <Navigate to="/driver" />;
  if (userData?.role === 'admin') return <Navigate to="/admin" />;
  
  return <Navigate to="/onboarding" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleBasedRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<PrivateRoute><Onboarding /></PrivateRoute>} />
          
          {/* Student Routes */}
          <Route path="/student" element={<PrivateRoute><StudentLayout /></PrivateRoute>}>
            <Route index element={<StudentDashboard />} />
            <Route path="subscribe" element={<Subscribe />} />
            <Route path="trips" element={<StudentTrips />} />
            <Route path="schedule" element={<StudentSchedule />} />
            <Route path="billing" element={<StudentBilling />} />
            <Route path="settings" element={<StudentSettings />} />
          </Route>

          {/* Driver Routes */}
          <Route path="/driver" element={<PrivateRoute><DriverLayout /></PrivateRoute>}>
             <Route index element={<DriverDashboard />} />
             <Route path="trips" element={<DriverTrips />} />
             <Route path="earnings" element={<DriverEarnings />} />
             <Route path="settings" element={<DriverSettings />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
             <Route index element={<AdminDashboard />} />
             <Route path="users" element={<AdminUsers />} />
             <Route path="trips" element={<AdminTrips />} />
             <Route path="finance" element={<AdminFinance />} />
             <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
