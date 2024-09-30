import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function PlacesPage() {
    const {action} = useParams();
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
                        <h2 className="text-start text-2xl font-bold mt-4">Title</h2>
                        {/* <p className="text-start text-gray-500">Include a short, apt, and catchy title for your listing!</p> */}
                        <input type='text' placeholder="Title, for example: My cozy and homely condo"/>
                        <h2 className="text-start text-2xl font-bold mt-4">Address</h2>
                        <input type='text' placeholder="Address" />
                        <h2 className="text-start text-2xl font-bold mt-4">Photos</h2>
                        <div className='mt-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 '>
                            <button className='border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>+</button>
                        </div>
                    </form>
                </div>
            )} 
        </div>
    );
}