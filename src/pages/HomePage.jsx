import React from 'react';
import styles from '../style';
import Navbar from '../components/Navbar';
import TourList from '../components/TourList';
import Slogan from '../components/Slogan';

const HomePage = () => {
    return (
        <div className="flex flex-col w-full overflow-hidden h-screen mx-auto px-auto">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar/>
          </div>
      </div>
      <div className='h-full grid grid-cols-12 w-full'>
          <div className='col-span-4 '>
          <Slogan/>
          </div>
          <div className='bg-transparent/40 col-span-8 rounded-2xl shadow-2xl relative'>
            <TourList/>
          </div>
      </div>
    </div>
    );
};

export default HomePage;