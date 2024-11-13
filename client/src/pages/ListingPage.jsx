import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import BookingComponent from "../components/BookingComponent";
import ListingGallery from "../components/ListingGallery";

export default function ListingPage() {
    
    const {id} = useParams();
    const [place, setPlace] = useState({});

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/listings/${id}`).then(response => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) return '';

    return (
        
        <div className="text-left mt-4 -mx-8 px-8 py-4">
            <h1 className="text-2xl font-semibold">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <ListingGallery place={place}/>
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr] ">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl mb-2">Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn} <br />
                    Check-out: {place.checkOut} <br />
                    Maximum Guests: {place.maxGuests}
                </div>
                <div>
                    <BookingComponent place={place}/>
                </div>
            </div>
            <div className="border-t -mx-8 px-8 py-8">
                <div>
                    <h2 className=" font-semibold text-2xl">Extra Information</h2>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-800 leading-5">
                            {place.miscInfo}
                </div>
            </div>
        </div>
    );
}