import React, {useState} from 'react';
import {differenceInCalendarDays} from 'date-fns'
import {UserContext} from './UserContext';
import {useContext} from 'react';

export default function BookingComponent({place}){
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const { user, ready } = useContext(UserContext);
    let days = 0;
    if (checkInTime && checkOutTime){
        days = differenceInCalendarDays(new Date(checkOutTime), new Date(checkInTime));
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
                        {days >0 && !!user &&(
                            <div className="py-3 px-4 border-t">
                                <label>Name:</label>
                                <input type="Text" 
                                        placeholder={user.name}/>
                        </div>
                        )}
                    </div>
                    <button className="primary mt-4">
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