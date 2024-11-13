import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import axios from "axios";
import AddressLink from "../components/AddressLink";
import ListingGallery from "../components/ListingGallery";
import BookingDates from "../components/BookingDates";

export default function SingleBookingPage() {
    
    const {id} = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const searchBooking = response.data.find(({_id}) => _id === id)
                if (searchBooking){
                    setBooking(searchBooking);
                }
            });
        }
    }, [id]);

    if (!booking){
        return '';
    }

    return (
        <div className="my-8">
            <h1 className=" text-left text-2xl font-semibold">{booking.place.title}</h1>
            <AddressLink className='my-3 block'>{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-left text-2xl mb-4">
                        Your Booking Information:
                    </h2>
                    <BookingDates booking={booking}/>
                </div>
                <div className="bg-primary p-4 text-white rounded-2xl">
                    <div>Total Price</div> 
                    <div className="text-3xl">${booking.price}</div>
                </div>
                
            </div>
            <ListingGallery place={booking.place}/>
        </div>
    );
} 