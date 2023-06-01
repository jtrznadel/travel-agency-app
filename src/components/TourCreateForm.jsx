import React, { useState } from 'react';
import axios from 'axios';
import serverAddress from '../constants/serverFile';
import { useNavigate } from 'react-router-dom';

const CreateTourForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Pobranie wartości pól z formularza
    const name= e.target.name.value;
    const description = e.target.description.value;
    const country= e.target.country.value;
    const destinationPoint = e.target.destinationPoint.value;
    const startDate= e.target.startDate.value;
    const endDate = e.target.endDate.value;
    const price = e.target.price.value;
    const tourLimit = e.target.tourLimit.value;

    try {
      const response = await axios({
        method: 'post',
        url: `${serverAddress}/tour`,
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
      navigate('/tourManagement'); // Przekierowanie po utworzeniu wycieczki
    } catch (error) {
      setError(error.response.data);
      // Obsługa błędów
    }
  };

  return (
    <section className="rounded-xl">
      <div className="flex flex-col items-center justify-center px-6 py-24">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create a new tour
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter tour name"
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
                    required                  />
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
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Create Tour
                  </button>
                  {error && (
                    <p className="text-[16px] pb-2 font-poppins text-red-500">{error}</p>
                  )} {/* Wyświetlanie błędu, jeśli istnieje */}
                </form>
              </div>
            </div>
          </div>
        </section>
      );
    };
    
    export default CreateTourForm;
    
