import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LoginForm from './components/Login/LoginForm';
import RegisterForm from './components/Register/RegisterForm';
import Home from './components/Home/Home';  // Import Home component
import ForgotPassword from './components/Login/ForgotPassword';
import VerifyOtp from './components/Login/VerifyOtp';
import ResetPassword from './components/Login/ResetPassword';
import CarList from './components/Car/CarList';
import BookingForm from './components/Booking/BookingForm';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />  {/* Home Route */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/verify-otp" element={<VerifyOtp/>} />
          <Route path="/reset-password" element={<ResetPassword/>} />
          <Route path="/cars" element={<CarList/>} />
          {/* <Route path="/bookings" element={<BookingForm/>} /> */}
          <Route path="/bookings/:id" element={<BookingForm/>}  />
          {/* <Route path="/payments" element={<PaymentsPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
