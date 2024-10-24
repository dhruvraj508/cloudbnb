import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Perks from '../Perks';
import axios from 'axios';
import { set } from 'mongoose';

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

    async function photoByURL(ev){
        ev.preventDefault();
        const{data:filename} = await axios.post('/upload-by-url', {link: photoLink});
        setAddedPhotos(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }


    function uploadPhoto(ev){
        const files = ev.target.files;
        // console.log({files});
        const data = new FormData();
        for (let i = 0; i < files.length; i++){
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(response =>{
            const {data: filenames} = response;
            setAddedPhotos(prev => {
                return [...prev, ...filenames];
            });
        })
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
                    <form>
                        {inputHeader('Title')}
                        {/* <p className="text-start text-gray-500">Include a short, apt, and catchy title for your listing!</p> */}
                        <input type='text' value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Title, for example: My cozy and homely condo"/>
                        {inputHeader('Address')}
                        <input type='text' value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Address" />
                        {inputHeader('Photos')}
                        <div className='flex gap-2'>
                            <input  value={photoLink} 
                                    onChange={ev => setPhotoLink(ev.target.value)} 
                                    type='text' placeholder={'Add JPG using a URL'}/>
                            <button onClick={photoByURL} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;Photo</button>
                        </div>
                        <div className='mt-3 grid gap-3 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 '>
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div className='h-32' flex>
                                    <img className='rounded-2xl w-full object-cover ' src={'http://localhost:4000/uploads/'+link} alt=''/>
                                </div>
                            ))}
                            <label className='h-32 cursor-pointer flex items-center gap-2 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
                                <input type="file" multiple className='hidden' onChange={uploadPhoto}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                                Upload
                            </label>
                        </div>
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