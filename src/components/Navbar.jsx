import React from 'react';
import logo from '../assets/logo.png'
import { navLinks } from '../constants';
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/");
      };
    return (
        <nav className='w-full flex py-6 justify-between items-center navbar'>
          <img src={logo} alt="travelAgency" className='w-[116px] h-[62px]' />
    
          <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
            <li className={` font-rubik font-bold cursor-pointer text-[18px] mr-10`}>
              <a className='li-style' href={`/`}>HOME</a>
            </li>
            {!token && (
              <>
                <li className={` font-rubik font-bold cursor-pointer text-[18px] mr-10`}>
                  <a className='li-style' href={`/register`}>REGISTER</a>
                </li>
                <li className={` font-rubik font-bold cursor-pointer text-[18px] mr-10`}>
                  <a className='li-style' href={`/login`}>LOGIN</a>
                </li>
              </>
            )}
            {token && (
              <li className={` font-rubik font-bold cursor-pointer text-[18px] mr-10`}>
                <button className='li-style' onClick={handleLogout}>LOGOUT</button>
              </li>
            )}
          </ul>
        </nav>
      );
    };
    
    export default Navbar;