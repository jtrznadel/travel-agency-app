import React from 'react';
import styles from './style';
import Navbar from './components/Navbar';
import TourList from './components/TourList';
import Slogan from './components/Slogan';

const App = () => (
    <div className="flex flex-col bg-primary w-full overflow-hidden h-screen">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar/>
          </div>
      </div>
      <div className='flex-1 bg-primary h-full grid grid-cols-12 gap-4'>
          <div className='col-span-4 '>
          <Slogan/>
          </div>
          <div className='bg-primary col-span-8'>
            <TourList/>
          </div>
      </div>
      
      {/* <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth} text-tertiary font-poppins`}>
          <TourList/>
        </div>
      </div> */}
    </div>
  );

export default App;