import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TourManagementPage from './pages/TourManagement/TourManagementPage';
import CreateTourPage from './pages/TourManagement/TourCreatePage';
import UpdateTourPage from './pages/TourManagement/TourUpdatePage';
import UserManagementPage from './pages/UserManagementPage';
import ReservationPage from './pages/ReservationPage';

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/travel-agency-app/register" element={<RegisterPage />} />
    <Route path="/travel-agency-app/tourManagement" element={<TourManagementPage />} />
    <Route path="/travel-agency-app/createTour" element={<CreateTourPage />} />
    <Route path="/travel-agency-app/userManagement" element={<UserManagementPage />} />
    <Route path="/travel-agency-app/updateTour/:tourId" element={<UpdateTourPage />} />
    <Route path="/travel-agency-app/reservations" element={<ReservationPage />} />
  </Routes>
);

export default App;
