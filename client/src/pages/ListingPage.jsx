import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookingComponent from "../BookingComponent";

export default function ListingPage() {
    
    const {id} = useParams();
    const [place, setPlace] = useState({});
    const [showAllPhotos, setShowAllPhotos] = useState(false);


    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/listings/${id}`).then(response => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) return '';

    if (showAllPhotos){
        return (
            // <div className="absolute inset-0 bg-white min-h-screen">
            //     <div className="p-8 grid gap-4">
            //         <div>
            //         <button className="flex fixed gap-1 py-2 px-4 rounded-2xl bg-gray-300 shadow shadow-gray-500 shadow-black">
            //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            //             <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            //             </svg>
            //             Close Photos
            //         </button>
            //     </div>
            //         {place?.photos?.length > 0 && place.photos.map(photo => (
            //             <div>
            //                 <img className="w-full" src={"http://localhost:4000/uploads/"+photo} alt="" />
            //             </div>
            //         ))}
            // </div>
            // </div>
            <div className="absolute inset-0 bg-white min-h-screen p-8">
                <div className="relative">
                    <button
                        onClick={() => setShowAllPhotos(false)}
                        className="fixed top-4 left-4 flex items-center gap-2 py-2 px-4 rounded-3xl bg-gray-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                        Back
                    </button>
                </div>
                <div className="grid gap-4 grid-cols-1 p-4">
                    {place?.photos?.length > 0 &&
                        place.photos.map((photo, index) => (
                            <div key={index} className="overflow-hidden flex justify-center">
                                <img
                                    className="object-cover max-w-2xl w-full h-auto"
                                    src={"http://localhost:4000/uploads/" + photo}
                                    alt=""
                                />
                            </div>
                        ))}
                </div>
            </div>
        );
    }

    return (
        // <div className="text-left mt-4  -mx-8 px-8 py-4">
        //     <h1 className="text-2xl">{place.title}</h1>
        //     <a className="my-2 mb-2 block font-semibold underline" target="_blank" href={'https://maps.google.com/?q='+place.address} >{place.address}</a>
        //     <div className="relative">
        //         <div className="grid gap-2 grid-cols-[2fr_1fr_1fr] ">
        //             <div>
        //                 {place.photos?.[0] &&(
        //                     <div>
        //                         <img className="aspect-square object-cover" src={"http://localhost:4000/uploads/"+place.photos[0]} alt="" />
        //                     </div>
        //                 )}
        //             </div>
        //             <div className="grid">
        //                 {place.photos?.[1] &&(
        //                     <img className="aspect-square object-cover" src={"http://localhost:4000/uploads/"+place.photos[1]} alt="" />
        //                 )}
        //                 <div className="overflow-hidden">
        //                     {place.photos?.[2] &&(
        //                     <img className="aspect-square object-cover relative top-2" src={"http://localhost:4000/uploads/"+place.photos[2]} alt="" />
        //                     )}
        //                 </div>
        //             </div>
        //             <div className="grid">
        //                 {place.photos?.[3] &&(
        //                     <img className="aspect-square object-cover" src={"http://localhost:4000/uploads/"+place.photos[3]} alt="" />
        //                 )}
        //                 <div className="overflow-hidden">
        //                     {place.photos?.[4] &&(
        //                     <img className="aspect-square object-cover relative top-2" src={"http://localhost:4000/uploads/"+place.photos[4]} alt="" />
        //                     )}
        //                 </div>
        //             </div>
        //         </div>
        //         <button onClick={()=>setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-1 px-4 bg-white rounded-lg border border-black">
        //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
        //             <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
        //             </svg>
        //             Show All Photos
        //         </button>
        //     </div>
            
        // </div>
        <div className="text-left mt-4 -mx-8 px-8 py-4">
        <h1 className="text-2xl font-semibold">{place.title}</h1>
        <a
            className="flex gap-1 my-3 mb-3 block font-semibold underline"
            target="_blank"
            href={'https://maps.google.com/?q=' + place.address}
            rel="noopener noreferrer"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>

            {place.address}
        </a>
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr_1fr] rounded-2xl overflow-hidden">
                {/* Column 1 - First large image */}
                <div>
                    {place.photos?.[0] && (
                        <img
                            className="aspect-square object-cover"
                            src={"http://localhost:4000/uploads/" + place.photos[0]}
                            alt=""
                        />
                    )}
                </div>
                
                {/* Column 2 - Two smaller images */}
                <div className="grid">
                    {place.photos?.[1] && (
                        <img
                            className="aspect-square object-cover"
                            src={"http://localhost:4000/uploads/" + place.photos[1]}
                            alt=""
                        />
                    )}
                    <div className="overflow-hidden">
                        {place.photos?.[2] && (
                            <img
                                className="aspect-square object-cover relative top-2"
                                src={"http://localhost:4000/uploads/" + place.photos[2]}
                                alt=""
                            />
                        )}
                    </div>
                </div>
                
                {/* Column 3 - Two smaller images */}
                <div className="grid">
                    {place.photos?.[3] && (
                        <img
                            className="aspect-square object-cover"
                            src={"http://localhost:4000/uploads/" + place.photos[3]}
                            alt=""
                        />
                    )}
                    <div className="overflow-hidden">
                        {place.photos?.[4] && (
                            <img
                                className="aspect-square object-cover relative top-2"
                                src={"http://localhost:4000/uploads/" + place.photos[4]}
                                alt=""
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Show All Photos Button */}
            <button
                onClick={() => setShowAllPhotos(true)}
                className="flex gap-1 absolute bottom-2 right-2 py-1 px-4 bg-white rounded-lg border border-black"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                    />
                </svg>
                Show All Photos
            </button>
        </div>
        
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
        <div>

        </div>
        <div>
            <h2 className=" font-semibold text-2xl">Extra Information</h2>
        </div>
        <div className="mb-4 mt-1 text-sm text-gray-800 leading-4">
                    {place.miscInfo}
        </div>
    </div>
    );
}