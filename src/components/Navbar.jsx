import React from 'react';
import logo from '../assets/logo.png'
import { navLinks } from '../constants';
const Navbar = () => {
    return (
        <nav className='w-full flex py-6 justify-between items-center navbar'>
            <img src={logo} alt="travelAgency" className='w-[116px] h-[62px]'/>

            <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
                {navLinks.map((nav, index) => 
                <li
                    key={nav.id}
                    className={` font-rubik font-bold cursor-pointer text-[18px]  ${index===navLinks.length-1 ? 'mr-0' : 'mr-10'} text-secondary mr-10`}
                >
                <a className='li-style' href={`#${nav.id}`}>{nav.title}</a>
                </li>)}
            </ul>
        </nav>
    );
};



export default Navbar;