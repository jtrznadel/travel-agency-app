import React, { useState, useEffect } from 'react';
import axios from 'axios';
import serverAddress from '../constants/serverFile';
import { useNavigate } from 'react-router-dom';
import { format, parse, isValid } from 'date-fns';

const TourUpdateForm = ({ tourId }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [errors, setErrors] = useState([]);
  const [tour, setTour] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `${serverAddress}/tour/${tourId}`,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        setTour(response.data);
        const startDate = new Date(response.data.startDate);
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const endDate = new Date(response.data.endDate);
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');
        setTour({
            ...response.data,
            formattedStartDate,
            formattedEndDate
          });
      } catch (error) {
        setError(error.response.data);
        // Obsługa błędów
      }
    };

    fetchTour();
  }, [tourId, token]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Pobranie wartości pól z formularza
    const name = e.target.name.value;
    const description = e.target.description.value;
    const country = e.target.country.value;
    const destinationPoint = e.target.destinationPoint.value;
    const startDate = parse(e.target.startDate.value, 'yyyy-MM-dd', new Date());
    const endDate = parse(e.target.endDate.value, 'yyyy-MM-dd', new Date());
    const price = e.target.price.value;
    const tourLimit = e.target.tourLimit.value;

    try {
      const response = await axios({
        method: 'put',
        url: `${serverAddress}/tour/${tourId}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          name: `${name}`, // This is the body part
          description: `${description}`,
          country: `${country}`,
          destinationPoint: `${destinationPoint}`,
          startDate: `${startDate}`,
          endDate: `${endDate}`,
          price: `${price}`,
          tourLimit: `${tourLimit}`
        }
      });

      // Obsługa sukcesu
      console.log(response.data);
      setError(null);
      navigate('/tourManagement'); // Przekierowanie po aktualizacji wycieczki
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorArray = Object.values(error.response.data.errors);
        setErrors(errorArray);
        console.log(errorArray)
      } else {
        setError('An error occurred');
      }
    }
  };

  return (
    <section className="rounded-xl">
      <div className="flex flex-col items-center justify-center px-6 py-24">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Update Tour
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray                  400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter tour name"
                    defaultValue={tour.name}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows="3"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter tour description"
                    defaultValue={tour.description}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter country"
                    defaultValue={tour.country}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="destinationPoint" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Destination Point
                  </label>
                  <input
                    type="text"
                    name="destinationPoint"
                    id="destinationPoint"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter destination point"
                    defaultValue={tour.destinationPoint}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={tour.formattedStartDate}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={tour.formattedEndDate}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter price"
                    defaultValue={tour.price}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="tourLimit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Tour Limit
                  </label>
                  <input
                    type="number"
                    name="tourLimit"
                    id="tourLimit"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter tour limit"
                    defaultValue={tour.tourLimit}
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Update Tour
                </button>
              </div>
              {errors.length > 0 && (
  <div className="mt-4">
    <h2 className="text-lg font-bold text-red-500">Errors:</h2>
    <ul className="list-disc list-inside">
      <li className="text-red-500">• {errors.slice(0, 2).join('\n• ')}</li>
      {errors.length > 2 && (
        <li className="text-red-500">• {errors.slice(2).join('\n• ')}</li>
      )}
    </ul>
  </div>
)}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourUpdateForm;

