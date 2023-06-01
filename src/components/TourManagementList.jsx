import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from '../tourStyle.css'
import img from '../assets/home-image.jpg'
import SearchBar from './SearchBar';
import { data } from 'autoprefixer';
import serverAddress from '../constants/serverFile';

const TourList = () => {
    const [tours, setTours] = useState([]);


    useEffect(() => {
        fetchTours('');
      }, []);

    const fetchTours = async (place) => {
    try{
        
        const {data} = await axios.get(`${serverAddress}/tour?pageSize=10&pageNumber=1&searchPhrase=${place}`)
        console.log(data.items);
        setTours(data.items);
        console.log(tours);
    }
    catch(e){
        console.log(e.response.data);
    
    }}

    const handleSearch = (searchParams) => {
        // Przetwarzanie wartości searchParams
        console.log(searchParams.place);
        console.log(searchParams.date);
        console.log(searchParams.price);
        // Wywołanie funkcji fetchTours z odpowiednimi parametrami
        fetchTours(searchParams.place);
      };

    const renderTours = () => {
        return Object.entries(tours)?.map(([key, tour], i) => {     
            const startDate = new Date(tour.startDate).toLocaleDateString();
            const endDate = new Date(tour.endDate).toLocaleDateString();   
            return (
                    <div key={key} className="bg-transparent/25 w-full p-5 mb-5">
                        <div className="grid grid-cols-12 grid-rows-3 gap-0">
                            <div className="col-span-4 row-span-3"><img src={img} className='w-[350px] h-[200px] my-5 rounded-lg' alt="" /></div>
                            <div className="col-span-8 col-start-5 font-poppins text-white text-center text-[24px]">{tour.name}</div>
                            <div className="col-span-8 row-span-2 col-start-5 row-start-2 font-poppins text-white">{tour.description}</div>
                            <div className="col-span-5 col-start-5 row-start-3 font-poppins text-white">
                                <span className='font-bold'>Place: </span>{tour.country}/{tour.destinationPoint} 
                                <span className='font-bold'><br/>Date: </span>{startDate} - {endDate}
                                <span className='font-bold'><br/>Price: $</span>{tour.price}
                                <span className='font-bold'><br/>Limit:</span> 0/{tour.tourLimit}
                            </div>
                            <div className="col-span-3 col-start-10 row-start-3">5</div>
                        </div>
                    </div>
            )
        })
    }
    return (
        <div className='grid grid-rows-12 gap-4 w-full'>
            <div className='row-span-6 text-right'>     
            <a href="/createTour">
            <button className='h-[50px] m-5 rounded-lg w-[15%] border-2 border-solid border-orange-500/50 font-monserrat text-white text-[18px] hover:bg-orange-500/50 ease-in duration-300'>Create Tour</button>
            </a> 
            </div>
            <div className="content row-span-6">
            <ul className='tours'>
                {renderTours()}
            </ul>
            </div>
        </div>
    );
};


export default TourList;