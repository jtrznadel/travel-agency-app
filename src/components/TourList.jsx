import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from '../tourStyle.css'

const TourList = () => {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        fetchTours();
      }, []);

    const fetchTours = async () => {
    try{
        
        const {data} = await axios.get("https://travelagency-api-app.azurewebsites.net/tour?pageSize=10&pageNumber=1")
        console.log(data.items);
        setTours(data.items);
        console.log(tours);
    }
    catch(e){
        console.log(e.response.data);
    
    }}

    const renderTours = () => {
        return Object.entries(tours)?.map(([key, tour], i) => {        
            return (
                    <li className='member' key={tour.id}>
                        <div className='thumb'></div>
                            <div className="description">
                                <h3>{tour.name}</h3>
                                <p>{tour.description}<br/>
                                <a href='#'>{tour.price}</a></p>
                            </div>
                    </li>
            )
        })
    }
    return (
        <div className='content'>
            <ul className='tours'>
                {renderTours()}
            </ul>
        </div>
    );
};


export default TourList;