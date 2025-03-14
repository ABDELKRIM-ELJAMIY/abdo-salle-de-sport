import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/shared/HomePage';
import Navbar from './components/Navbar';
// import Footer from './components/footer';
import LoginPage from './pages/shared/LoginPage';
import RegisterPage from './pages/shared/RegisterPage';
import ReservationPage from './pages/shared/ReservationPage';
import TrainerReservationPage from './pages/admin/TrainerReservationPage';
import TrainerModifyReservationPage from './pages/admin/TrainerModifyReservationPage';
import MemberReservationPage from './pages/user/MemberReservationPage';
import SessionPage from './pages/shared/SessionPage'; // Import the session page
import CreateSession from './pages/admin/CreateSession'; // Import the create session page


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reservations" element={<ReservationPage />} />
          <Route path="/member/reservations" element={<MemberReservationPage />} />
          <Route path="/trainer/reservations" element={<TrainerReservationPage />} />
          <Route path="/trainer/reservations/:id" element={<TrainerModifyReservationPage />} />
          <Route path="/sessions" element={<SessionPage />} /> 
          <Route path="/sessions/create" element={<CreateSession />} /> 
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
