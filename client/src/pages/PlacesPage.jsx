import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function PlacesPage() {
    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [extraInfo, setExtraInfo] = useState('');
    
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
    return(
        <div>
            {action !== 'new' && (
                <div className="text-center">
                <Link className="inline-flex gap-2 bg-primary text-white py-2 px-6 rounded-full" to = {'/account/listings/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add a new listing
                </Link>
            </div>
            )}
            {action === 'new' && (
                <div className='text-left'>
                    <form>
                        {inputHeader('Title')}
                        {/* <p className="text-start text-gray-500">Include a short, apt, and catchy title for your listing!</p> */}
                        <input type='text' placeholder="Title, for example: My cozy and homely condo"/>
                        {inputHeader('Address')}
                        <input type='text' placeholder="Address" />
                        {inputHeader('Photos')}
                        <div className='flex gap-2'>
                            <input type='text' placeholder={'Add JPG using a URL'}/>
                            <button className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;Photo</button>
                        </div>
                        <div className='mt-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 '>
                            <button className='flex gap-2 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                                Upload
                            </button>
                        </div>
                        <h2 className="text-start text-2xl font-bold mt-4">Description</h2>
                        <textarea />
                        <h2 className="text-start text-2xl font-bold mt-4">Perks</h2>
                        <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
                            <label className='border p-4 flex rounded-2xl gap-2 items-center'>
                                <input type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                                </svg>
                                <span>Wi-Fi</span>
                            </label>
                            <label className='border p-4 flex rounded-2xl gap-2 items-center'>
                                <input type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-closed" viewBox="0 0 16 16">
                                    <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3zm1 13h8V2H4z"/>
                                    <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0"/>
                                </svg>
                                <span>Private Entrance</span>
                            </label>
                            <label className='border p-4 flex rounded-2xl gap-2 items-center'>
                                <input type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-p-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002V12h1.283V9.164h1.668C10.033 9.164 11 8.08 11 6.586c0-1.482-.955-2.584-2.538-2.584zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z"/>
                                </svg>
                                <span>Free Parking</span>
                            </label>
                            <label className='border p-4 flex rounded-2xl gap-2 items-center'>
                                <input type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                <span>In-Suite Laundry</span>
                            </label>
                            <label className='border p-4 flex rounded-2xl gap-2 items-center'>
                                <input type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 576 512">{/*<!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                    <path d="M309.6 158.5L332.7 19.8C334.6 8.4 344.5 0 356.1 0c7.5 0 14.5 3.5 19 9.5L392 32l52.1 0c12.7 0 24.9 5.1 33.9 14.1L496 64l56 0c13.3 0 24 10.7 24 24l0 24c0 44.2-35.8 80-80 80l-32 0-16 0-21.3 0-5.1 30.5-112-64zM416 256.1L416 480c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-115.2c-24 12.3-51.2 19.2-80 19.2s-56-6.9-80-19.2L160 480c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-230.2c-28.8-10.9-51.4-35.3-59.2-66.5L1 167.8c-4.3-17.1 6.1-34.5 23.3-38.8s34.5 6.1 38.8 23.3l3.9 15.5C70.5 182 83.3 192 98 192l30 0 16 0 159.8 0L416 256.1zM464 80a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z"/>
                                </svg>
                                <span>Pets</span>
                            </label>
                        </div>
                        <h2 className="text-start text-2xl font-bold mt-4">Check-in, check-out times, and Guests</h2>
                        <div className='grid gap-2 sm:grid-cols-3'>
                            <div className='mt-2 -mb-2'>
                                <h3>Check-in time</h3>
                                <input type="text" />
                            </div>
                            <div className='mt-2 -mb-2'>
                                <h3>Check-out time</h3>
                                <input type="text" />
                            </div>
                            <div className='mt-2 -mb-2'>
                                <h3>Maximum Guests</h3>
                                <input type="text" />
                            </div>
                        </div>
                        <h2 className="text-start text-2xl font-bold mt-4">Extra Information</h2>
                        <textarea />
                        <div>
                            <button className="primary my-4">Save</button>
                        </div>
                    </form>
                </div>
            )} 
        </div>
    );
}