import React from 'react';
import logo from '../assets/logo.png'
const Navbar = () => {
    return (
        <nav className='w-full flex py-6 justify-between items-center navbar'>
            <img src={logo} alt="travelAgency" className='w-[124px] h-[124px]'/>
        </nav>
    );
};



export default Navbar;