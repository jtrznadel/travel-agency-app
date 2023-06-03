import React, { useEffect, useState } from 'react';
import axios from 'axios';
import serverAddress from '../constants/serverFile';
import Modal from 'react-modal';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelReservationId, setCancelReservationId] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `${serverAddress}/reservation`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {}
      });
      setReservations(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  };

  const openCancelModal = (reservationId) => {
    setCancelReservationId(reservationId);
    setCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setCancelModalOpen(false);
  };

  const cancelReservation = async () => {
    try {
      await axios({
        method: 'put',
        url: `${serverAddress}/reservation/${cancelReservationId}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          reason: cancelReason
        }
      });
      console.log('Reservation canceled successfully.');
      fetchReservations();
      closeCancelModal();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const renderReservations = () => {
    return reservations.map((reservation) => {
      const { id, status, tour, startDate, endDate } = reservation;

      const statusClass = status === 'Ongoing' ? 'text-green-500' : 'text-red-500';
      const cancelButton =
        status === 'Ongoing' ? (
          <button className="text-red-500" onClick={() => openCancelModal(id)}>
            Cancel
          </button>
        ) : null;

      return (
        <div key={id} className="bg-transparent/80 rounded-lg p-4 my-4 w-full text-white">
          <div className="grid grid-cols-2 gap-4">
            <div className={`col-span-2 text-center font-bold text-xl ${statusClass}`}>
              Reservation no.: {id}
            </div>
            <div className={`col-span-2 ${statusClass}`}>Status: {status}</div>
            <div className="col-span-2">Tour Name: {tour.name}</div>
            <div className="col-span-2">Date: {formatDate(tour.startDate)} - {formatDate(tour.endDate)}</div>
            <div className="col-span-2 text-right">{cancelButton}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col items-center content">
      {renderReservations()}

      <Modal
        isOpen={cancelModalOpen}
        onRequestClose={closeCancelModal}
        contentLabel="Cancel Reservation Modal"
        className="bg-white rounded-lg overflow-hidden p-4 w-64 mx-auto mt-20 text-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
        <h2 className="text-xl font-bold mb-4">Cancel Reservation</h2>
        <label htmlFor="cancelReason" className="block mb-2">Reason:</label>
        <input
        type="text"
        id="cancelReason"
        value={cancelReason}
        onChange={(e) => setCancelReason(e.target.value)}
        className="border border-gray-300 rounded-md px-2 py-1 mb-4 w-full"
        />
        <button
               onClick={cancelReservation}
               className="bg-red-500 text-white rounded-md px-4 py-2 m-2"
             >
        Continue Cancellation
        </button>
        <button
               onClick={closeCancelModal}
               className="bg-gray-300 text-gray-700 rounded-md px-4 py-2"
             >
        Cancel
        </button>
        </Modal>
        </div>
        );
        };
        
        export default ReservationList;