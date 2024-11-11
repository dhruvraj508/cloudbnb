import React, {useEffect, useState} from 'react';
import {differenceInCalendarDays} from 'date-fns'
import {UserContext} from './UserContext';
import {useContext} from 'react';
import axios from 'axios';
import { Navigate } from 'react-router';

export default function BookingComponent({place}){
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);
    
    useEffect(()=>{
        if (user) {
            setFullName(user.name);
        }
    }, [user]);
    
    
    let days = 0;
    if (checkInTime && checkOutTime){
        days = differenceInCalendarDays(new Date(checkOutTime), new Date(checkInTime));
    }

    async function reserveThisPlace(){
        
        const response = await axios.post('/bookings', {
            checkInTime, place: place._id,
            checkOutTime, price: days * place.price,
            numberOfGuests, fullName, 
            mobile});
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect){
        return <Navigate to={redirect}/>
    }
    
    
    return (
        <div className="bg-white border shadow-lg p-4 rounded-2xl mt-4">
                    <div className="text-2xl text-center">
                        <span className="font-semibold">${place.price}</span> night
                    </div>
                    <div className="border rounded-2xl mt-4">
                        <div className="flex">
                            <div className="py-3 px-4 ">
                                <label>Check in:</label>
                                <input type="date" 
                                        value={checkInTime} 
                                        onChange={ev=>setCheckInTime(ev.target.value)}/>
                            </div>
                            <div className="py-3 px-4 border-l">
                                <label>Check out:</label>
                                <input type="date" 
                                        value={checkOutTime} 
                                        onChange={ev=>setCheckOutTime(ev.target.value)}/>
                            </div>
                        </div>
                        <div className="py-3 px-4 border-t">
                            <label>Guests:</label>
                            <input type="number" 
                                    value={numberOfGuests} 
                                    onChange={ev=>setNumberOfGuests(ev.target.value)}/>
                        </div>
                        {days >0 &&(
                            <div className="py-3 px-4 border-t">
                                <label>Full Name:</label>
                                <input type="text" 
                                        value={fullName} 
                                        onChange={ev=>setFullName(ev.target.value)}/>
                                <label>Phone Number:</label>
                                <input type="tel" 
                                        value={mobile} 
                                        onChange={ev=>setMobile(ev.target.value)}/>
                        </div>
                        )}
                    </div>
                    <button onClick={reserveThisPlace} className="primary mt-4">
                        Reserve for   
                        {days > 0 && (
                            <span className='mx-1'>
                                ${days * place.price} 
                            </span>
                        )}
                    </button>
                </div>
    );
}