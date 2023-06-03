import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../tourStyle.css';
import img1 from '../assets/example-image1.jpg';
import img2 from '../assets/example-image2.jpg';
import img3 from '../assets/example-image3.jpg';
import SearchBar from './SearchBar';
import serverAddress from '../constants/serverFile';

const TourList = () => {
  const [tours, setTours] = useState([]);
  const [tourLimits, setTourLimits] = useState({});
  const [discount, setDiscount] = useState();
  const [userReservations, setUserReservations] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTours('','','');
    getDiscount();
    fetchUserReservations();
  }, []);

  const fetchTours = async (place, date, price) => {
    try {
      const { data } = await axios.get(
        `${serverAddress}/tour?pageSize=50&pageNumber=1&searchPrice=${encodeURIComponent(price)}&searchDate=${encodeURIComponent(date)}&searchPhrase=${encodeURIComponent(place)}`

      );
      setTours(data.items);
      const tourIds = data.items.map((tour) => tour.id);
      fetchTourLimits(tourIds);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const getDiscount = async () => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `${serverAddress}/account/discount`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {}
      });
      setDiscount(data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const fetchTourLimits = async (tourIds) => {
    try {
      const limitsPromises = tourIds.map((tourId) =>
        axios.get(`${serverAddress}/reservation/limit/${tourId}`)
      );
      const limitsResponses = await Promise.all(limitsPromises);
      const limitsData = limitsResponses.map((response) => response.data);
      const tourLimitsMap = limitsData.reduce((map, limit, index) => {
        const tourId = tourIds[index];
        map[tourId] = limit;
        return map;
      }, {});
      setTourLimits(tourLimitsMap);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const bookResponse = async (tourId) => {
    await axios({
      method: 'post',
      url: `${serverAddress}/reservation`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        tourId: `${tourId}`
      }
    });
    await fetchTours('');
    fetchUserReservations();
    window.location.reload(false);
  };

  const handleBookTour = async (tourId) => {
    console.log(tourId);
    if (
      tourLimits[tourId] < tours.find((tour) => tour.id === tourId)?.tourLimit &&
      token &&
      !userReservations.includes(tourId)
    ) {
      bookResponse(tourId);
    }
  };

  const handleSearch = (searchParams) => {
    fetchTours(searchParams.place,searchParams.date,searchParams.price);
  };

  const fetchUserReservations = async () => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `${serverAddress}/reservation`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {}
      });
      console.log(data);
      const ongoingReservations = data
      .filter((reservation) => reservation.status === 'Ongoing')
      .map((reservation) => reservation.tourId);
      console.error(ongoingReservations)
      setUserReservations(ongoingReservations);
    } catch(e) {
        console.log(e.response.data);
        }
        };
        
        const renderTours = () => {
        return Object.entries(tours)?.map(([key, tour], i) => {
        const startDate = new Date(tour.startDate).toLocaleDateString();
        const endDate = new Date(tour.endDate).toLocaleDateString();
        const tourLimit = tourLimits[tour.id] || 0;
        const images = [img1, img2, img3];
        const randomIndex = Math.floor(Math.random() * images.length);
        const randomImage = images[randomIndex];

        return (
          <div key={key} className="bg-transparent/25 w-full p-5 mb-5">
            <div className="grid grid-cols-12 grid-rows-3 gap-0">
              <div className="col-span-4 row-span-3">
                <img src={randomImage} className="w-[350px] h-[200px] my-5 rounded-lg" alt="" />
              </div>
              <div className="col-span-8 col-start-5 font-poppins text-white text-center text-[24px]">
                {tour.name}
              </div>
              <div className="col-span-8 row-span-2 col-start-5 row-start-2 font-poppins text-white">
                {tour.description}
              </div>
              <div className="col-span-5 col-start-5 row-start-3 font-poppins text-white">
                <span className="font-bold">Place: </span>
                {tour.country}/{tour.destinationPoint}
                <span className="font-bold">
                  <br />Date: </span>{startDate} - {endDate}
                <span className="font-bold">
                  <br />Price: </span>
                {discount ? (
                  <>
                    <span className="line-through">${tour.price}</span>
                    <span className="text-green-500"> ${(tour.price * 0.9)}</span><span> Discount applied!</span>
                  </>
                ) : (
                  <span>${tour.price}</span>
                )}
                <span className="font-bold">
                  <br />Limit: {tourLimit}/{tour.tourLimit}
                </span>
              </div>
              <div className="col-span-3 col-start-10 row-start-3">
                {tourLimit < tour.tourLimit && token && !userReservations.includes(tour.id) && (
                  <button className='h-[50px] w-[150px] m-5 rounded-lg w-[15%] border-2 border-solid border-orange-500/50 font-monserrat text-white text-[18px] hover:bg-orange-500/50 ease-in duration-300' onClick={() => handleBookTour(tour.id)}>
                    Book
                  </button>
                )}
                {tourLimit < tour.tourLimit && token && userReservations.includes(tour.id) && (
                  <button className='h-[50px] w-[200px] m-5 rounded-lg w-[15%] border-2 border-solid border-orange-500/50 font-monserrat text-white text-[18px] disabled' onClick={() => handleModal()}>
                    Already Booked
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      });
    };

    const handleModal = () => {
    // Logika otwarcia modala informującego użytkownika, że już zarezerwował wycieczkę
    // Możesz użyć biblioteki modalowej takiej jak react-modal
    // Przykładowy kod:
    // setModalOpen(true);
    };
    
    return (
    <div className="grid grid-rows-12 gap-4 w-full">
    <div className="row-span-6">      
    <SearchBar onSearch={handleSearch} />
  </div>
  <div className="content row-span-6">
    <ul className="tours">{renderTours()}</ul>
  </div>
</div>
);
};

export default TourList;
