import React from 'react';
import styles from '../style';
import Navbar from '../components/Navbar';
import RegisterForm from '../components/RegisterForm';
import Slogan from '../components/Slogan';
import ReservationList from '../components/ReservationList';


const RegisterPage = () => {
    return (
        <div className="flex flex-col w-full overflow-hidden h-screen mx-auto px-auto">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar/>
          </div>
      </div>
      <div className='h-full grid grid-cols-12 w-full'>
          <div className='col-span-4'>
          <Slogan/>
          </div>
          <div className='col-span-2'></div>
          <div className=' col-span-5 rounded-2xl relative mr-10 mb-10'>
            <ReservationList/>
          </div>
      </div>
    </div>
    );
};

export default RegisterPage;