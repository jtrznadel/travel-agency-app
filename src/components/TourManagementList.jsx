import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../tourStyle.css';
import img from '../assets/home-image.jpg';
import SearchBar from './SearchBar';
import { data } from 'autoprefixer';
import serverAddress from '../constants/serverFile';

const TourList = () => {
  const [tours, setTours] = useState([]);
  const [tourLimits, setTourLimits] = useState({});
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token');
  const credentials = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const role = credentials ? Object.entries(credentials)[2][1] : null;
  console.log(role);

  useEffect(() => {
    if (role === 'Manager') {
      fetchToursManager('');
    } else {
      fetchTours('');
    }
  }, [role]);

  const fetchTours = async (place) => {
    try {
      const { data } = await axios.get(`${serverAddress}/tour?pageSize=50&pageNumber=1&searchPhrase=${place}`);
      console.log(data.items);
      setTours(data.items);
      console.log(tours);
      const tourIds = data.items.map((tour) => tour.id);
      fetchTourLimits(tourIds);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const fetchToursManager = async (place) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `${serverAddress}/tour/manager?pageSize=50&pageNumber=1&searchPhrase=${place}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {}
      });
      console.log(data.items);
      setTours(data.items);
      console.log(tours);
      const tourIds = data.items.map((tour) => tour.id);
      fetchTourLimits(tourIds);
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

  const handleDeleteTour = async (tourId) => {
    const tourLimit = tourLimits[tourId] || 0;
    if (tourLimit > 0) {
      setShowModal(true);
    } else {
      try {
        await axios({
          method: 'delete',
          url: `${serverAddress}/tour/${tourId}`,
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: {}
        });
        // Przeładuj listę wycieczek po usunięciu
        if (role === 'Manager') {
          fetchToursManager('');
        } else {
          fetchTours('');
        }
    } catch (e) {
        console.log(e.response.data);
      }
    }
  };

  const handleUpdateTour = (tourId) => {
    // Przekieruj do strony UpdateTourPage, przekazując identyfikator wycieczki jako parametr URL
    window.location.href = `/updateTour/${tourId}`;
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderTours = () => {
    return tours.map((tour) => {
      const startDate = new Date(tour.startDate).toLocaleDateString();
      const endDate = new Date(tour.endDate).toLocaleDateString();
      const tourLimit = tourLimits[tour.id] || 0;

      return (
        <div key={tour.id} className="bg-transparent/25 w-full p-5 mb-5">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <img src={img} className="w-full h-auto my-5 rounded-lg" alt="" />
            </div>
            <div className="col-span-8">
              <div className="font-poppins text-white text-center text-[24px] mb-4">
                {tour.name}
              </div>
              <div className="font-poppins text-white mb-4">
                {tour.description}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="font-poppins text-white">
                  <span className="font-bold">Place: </span>
                  {tour.country}/{tour.destinationPoint}
                </div>
                <div className="font-poppins text-white">
                  <span className="font-bold">Date: </span>
                  {startDate} - {endDate}
                </div>
                <div className="font-poppins text-white">
                  <span className="font-bold">Price: $</span>
                  {tour.price}
                </div>
                <div className="font-poppins text-white">
                  <span className="font-bold">Limit: </span>
                  {tourLimit}/{tour.tourLimit}
                </div>
              </div>
            </div>
            <div className="col-span-12 flex justify-end items-center">
              {role === 'Manager' ? (
                <>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer mr-2"
                    onClick={() => handleDeleteTour(tour.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded-md cursor-pointer"
                    onClick={() => handleUpdateTour(tour.id)}
                  >
                    Update
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full">
      <div className="text-right">
        <a href="/createTour">
          <button className="h-[50px] m-5 rounded-lg border-2 border-solid border-orange-500/50 font-monserrat text-white text-[18px] hover:bg-orange-500/50 ease-in duration-300">
            Create Tour
          </button>
        </a>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {renderTours()}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Cannot Delete Tour</h2>
          <p>
            This tour cannot be deleted because there are participants already signed up for it.
            Please contact with administrator.
          </p>
          <div className="mt-4 text-right">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default TourList;


