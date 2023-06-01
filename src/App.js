import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TourManagementPage from './pages/TourManagement/TourManagementPage';
import CreateTourPage from './pages/TourManagement/TourCreatePage';
import UserManagementPage from './pages/UserManagementPage';


const App = () => (
    <Routes>
      <Route exact path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/tourManagement" element={<TourManagementPage/>} />
      <Route path="/createTour" element={<CreateTourPage/>} />
      <Route path="/userManagement" element={<UserManagementPage/>} />
    </Routes>
  );

export default App;