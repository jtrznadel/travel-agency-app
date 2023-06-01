import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSearch = () => {
    // Wywołanie funkcji search() przekazanej jako prop, przekazując wartości pól
    onSearch({ place, date, price });
  };
  const handleClearSearch = () => {
    setPlace('');
    setDate('');
    setPrice('');
    // Wywołanie funkcji search() przekazanej jako prop, przekazując wartości pól
    onSearch({ place:'', date:'', price:'' });
  };

  return (
    <div className='text-center bg-transparent/50 m-2 rounded-xl'>
      <input className='h-[50px] m-5 rounded-lg p-5 w-[15%]' type="text" placeholder="Destiny" value={place} onChange={handlePlaceChange} />
      <input className='h-[50px] m-5 p-5 rounded-lg w-[15%]' type="date" placeholder="Date" value={date} onChange={handleDateChange} />
      <input className='h-[50px] m-5 p-5 rounded-lg w-[15%]'type="number" placeholder="Price ($)" value={price} onChange={handlePriceChange} />
      <button className='h-[50px] m-5 rounded-lg w-[15%] border-2 border-solid border-orange-500/50 font-monserrat text-white text-[18px] hover:bg-orange-500/50 ease-in duration-300' onClick={handleSearch}>Search</button>
      <button className='h-[50px] m-5 rounded-lg w-[15%] border-2 border-solid border-orange-500/50 font-monserrat text-white text-[18px] hover:bg-orange-500/50 ease-in duration-300' onClick={handleClearSearch}>Clear</button>
    </div>
  );
}

export default SearchBar;
