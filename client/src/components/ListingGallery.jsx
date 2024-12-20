// Desc: ListingGallery component for displaying listing photos

import { useState } from "react";
export default function ListingGallery({place}) {
    
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos){
        return (
            
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
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr_1fr] rounded-2xl overflow-hidden">
                {/* Column 1 - First large image */}
                <div>
                    {place.photos?.[0] && (
                        <img
                            onClick={() => setShowAllPhotos(true)}
                            className="aspect-square object-cover cursor-pointer"
                            src={"http://localhost:4000/uploads/" + place.photos[0]}
                            alt=""
                        />
                    )}
                </div>
                
                {/* Column 2 - Two smaller images */}
                <div className="grid">
                    {place.photos?.[1] && (
                        <img
                            onClick={() => setShowAllPhotos(true)}
                            className="aspect-square object-cover cursor-pointer"
                            src={"http://localhost:4000/uploads/" + place.photos[1]}
                            alt=""
                        />
                    )}
                    <div className="overflow-hidden">
                        {place.photos?.[2] && (
                            <img
                                onClick={() => setShowAllPhotos(true)}  
                                className="aspect-square object-cover relative top-2 cursor-pointer"
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
                            onClick={() => setShowAllPhotos(true)}
                            className="aspect-square object-cover cursor-pointer"
                            src={"http://localhost:4000/uploads/" + place.photos[3]}
                            alt=""
                        />
                    )}
                    <div className="overflow-hidden">
                        {place.photos?.[4] && (
                            <img
                                onClick={() => setShowAllPhotos(true)}
                                className="aspect-square object-cover relative top-2 cursor-pointer"
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
    );
}