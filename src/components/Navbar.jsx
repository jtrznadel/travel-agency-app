import React from 'react';
import logo from '../assets/logo.png';
import { navLinks } from '../constants';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const credentials = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const role = credentials ? (Object.entries(credentials))[2][1] : null;
  console.log(role);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/travel-agency-app');
    window.location.reload(); // Odświeżenie strony
  };

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo} alt="travelAgency" className="w-[116px] h-[62px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        <li className={`font-rubik font-bold cursor-pointer text-[18px] mr-10`}>
          <a className="li-style" href={`/travel-agency-app`}>
            HOME
          </a>
        </li>
        {!token && (
          <>
            <li className={`font-rubik font-bold cursor-pointer text-[18px] mr-10`}>
              <a className="li-style" href={`/travel-agency-app/register`}>
                REGISTER
              </a>
            </li>
            <li className={`font-rubik font-bold cursor-pointer text-[18px] mr-10`}>
              <a className="li-style" href={`/travel-agency-app/login`}>
                LOGIN
              </a>
            </li>
          </>
        )}
        {role === "Admin" && (
          <>
            <li className={`font-rubik font-bold cursor-pointer text-[18px] mr-10`}>
              <a className="li-style" href={`/travel-agency-app/userManagement`}>
                USER MANAGEMENT
              </a>
            </li>
            <li className={`font-rubik font-bold cursor-pointer text-[18px] mr-10`}>
              <a className="li-style" href={`/travel-agency-app/tourManagement`}>
                TOUR MANAGEMENT
              </a>
            </li>
          </>
        )}
        {role === "Manager" && (
          <>
            <li className={`font-rubik font-bold cursor-pointer text-[18px] mr-10`}>
              <a className="li-style" href={`/travel-agency-app/tourManagement`}>
                TOUR MANAGEMENT
              </a>
            </li>
          </>
        )}
        {role === "User" && (
          <>
            <li className={`font-rubik font-bold cursor-pointer text-[18px] mr-10`}>
              <a className="li-style" href={`/travel-agency-app/reservations`}>
                RESERVATIONS
              </a>
            </li>
          </>
        )}
        {token && (
          <li className={`font-rubik font-bold cursor-pointer text-[18px] mr-10`}>
            <button className="li-style" onClick={handleLogout}>
              LOGOUT
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
