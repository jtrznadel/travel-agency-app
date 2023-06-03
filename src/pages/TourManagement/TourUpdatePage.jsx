import React from 'react';
import styles from '../../style';
import Navbar from '../../components/Navbar';
import Slogan from '../../components/Slogan';
import TourUpdateForm from '../../components/TourUpdateForm';
import { useParams } from 'react-router-dom';



const UpdateTourPage= () => {
    const { tourId } = useParams();
    console.log(tourId);
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
            <TourUpdateForm tourId={tourId}/>
          </div>
      </div>
    </div>
    );
};

export default UpdateTourPage;