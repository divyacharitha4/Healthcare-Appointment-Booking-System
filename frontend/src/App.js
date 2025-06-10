import React, { Profiler } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { Toaster } from "react-hot-toast";
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import Notifications from './pages/Notifications';
import Userslist from './pages/Admin/Userslist';
import DoctorsList from './pages/Admin/DoctorsList';
import Profile from './pages/doctors/Profile'
import BookAppointment from './pages/BookAppointment';
import Appointments from './pages/Appointments';
import DoctorAppointments from './pages/doctors/doctorAppointments';
import UpdatePassword from './pages/Update password';

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="loader row" role="status">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      )
      }
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        <Route path='/' element={<PublicRoute><Main /></PublicRoute>} /> 
        <Route path='/Login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/Register' element={<PublicRoute><Register/></PublicRoute>} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/apply-doctor' element={<ProtectedRoute><ApplyDoctor /></ProtectedRoute>} />
        <Route path='/notifications' element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path='/admin/userslist' element={<ProtectedRoute><Userslist /></ProtectedRoute>} />
        <Route path='/admin/doctorslist' element={<ProtectedRoute><DoctorsList /></ProtectedRoute>} />
        <Route path='/doctor/profile/:userId' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/book-appointment/:doctorId' element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
        <Route path='/appointments' element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
        <Route path='/doctor/appointments' element={<ProtectedRoute><DoctorAppointments /></ProtectedRoute>} />
        <Route path='/update-password' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
