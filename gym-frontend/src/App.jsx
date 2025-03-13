import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Footer from './components/footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ReservationPage from './pages/ReservationPage';
import TrainerReservationPage from './pages/TrainerReservationPage';
import TrainerModifyReservationPage from './pages/TrainerModifyReservationPage';
import MemberReservationPage from './pages/MemberReservationPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reservations" element={<ReservationPage />} />
          <Route path="/member/reservations" element={<MemberReservationPage />} />
          <Route path="/trainer/reservations" element={<TrainerReservationPage />} />
          <Route path="/trainer/reservations/:id" element={<TrainerModifyReservationPage />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
