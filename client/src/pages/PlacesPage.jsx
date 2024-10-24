import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Perks from '../Perks';
import axios from 'axios';
import { set } from 'mongoose';
import PhotoUploader from '../PhotoUploader';
import { Navigate } from 'react-router-dom';

export default function PlacesPage() {
    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [extraInfo, setExtraInfo] = useState('');
    const [redirect, setRedirect] = useState('');
    
    function inputHeader(text){
        return(
            <h2 className="text-start text-2xl font-bold mt-4">{text}</h2>

        );
    }
    // function preInput(header){
    //     return(
    //         <>
    //         {inputHeader(header)}
    //         </>
    //     );
    // }
    // console.log(action);
   
    async function addNewPlace(ev){
        ev.preventDefault();
          
        await axios.post('/listings', {
            title, address, addedPhotos, 
            description, perks, checkInTime, 
            checkOutTime, maxGuests, extraInfo
        });
        setRedirect('/account/listings');
    }

    if (redirect){
        return <Navigate to={redirect}/>
    }

    return(
        <div>
            {action !== 'new' && (
                <div className="text-center">
                <Link className="inline-flex gap-2 bg-primary text-white py-2 px-6 rounded-full" to = {'/account/listings/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add a new listing
                </Link>
            </div>
            )}
            {action === 'new' && (
                <div className='text-left'>
                    <form onSubmit={addNewPlace}>
                        {inputHeader('Title')}
                        {/* <p className="text-start text-gray-500">Include a short, apt, and catchy title for your listing!</p> */}
                        <input type='text' value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Title, for example: My cozy and homely condo"/>
                        {inputHeader('Address')}
                        <input type='text' value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Address" />
                        {inputHeader('Photos')}
                        <PhotoUploader addedPhotos = {addedPhotos} onChange={setAddedPhotos}/>
                        {inputHeader('Description')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>
                        {inputHeader('Perks')}
                        <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
                            <Perks selected={perks} onChange={setPerks}/>
                        </div>
                        {inputHeader('Check-in, check-out times, and Guests')}
                        <div className='grid gap-2 sm:grid-cols-3'>
                            <div className='mt-2 -mb-2'>
                                <h3>Check-in time</h3>
                                <input type="text" value={checkInTime} onChange={ev => setCheckInTime(ev.target.value)} placeholder='1500 hrs' />
                            </div>
                            <div className='mt-2 -mb-2'>
                                <h3>Check-out time</h3>
                                <input type="text" value={checkOutTime} onChange={ev => setCheckOutTime(ev.target.value)} placeholder='1000 hrs' />
                            </div>
                            <div className='mt-2 -mb-2'>
                                <h3>Maximum Guests</h3>
                                <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} />
                            </div>
                        </div>
                        {inputHeader('Extra Information')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                        <div>
                            <button className="primary my-4">Save</button>
                        </div>
                    </form>
                </div>
            )} 
        </div>
    );
}