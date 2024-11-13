import { Link, useParams } from 'react-router-dom';
import PlacesFormPage from './PlacesFormPage';
import AccountNav from '../components/AccountNav';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PlaceImg from '../components/PlaceImg';

export default function PlacesPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-listings').then(({data}) => {
            setPlaces(data);
        });
    },[]);
    const {action} = useParams();

    return(
        <div>
            <AccountNav/>
                <div className="text-center">
                <Link className="inline-flex gap-2 bg-primary text-white py-2 px-6 rounded-full" to = {'/account/listings/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add a new listing
                </Link>
                </div>
                <div className='mt-4'>
                    {places.length > 0 && places.map(place => (
                        <div className='mt-4'>
                            <Link to={'/account/listings/'+place._id} className='flex cursor-pointer gap-4 bg-gray-200 p-4 rounded-2xl'>
                            <div className='flex w-32 h-32 bg-gray-300 grow shrink-0 rounded-2xl'>
                                <PlaceImg place={place}/>
                            </div>
                            <div className='grow-0 shrink'>
                                <h2 className='text-xl font-semibold'>{place.title}</h2>
                                <p className='text-sm mt-2'>{place.description}</p>
                            </div>
                            </Link>
                        </div>    
                    ))}
                </div>
        </div>
    );
}