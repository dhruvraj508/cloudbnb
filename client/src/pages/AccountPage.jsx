import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';


export default function AccountPage() {
    const {ready, user} = useContext(UserContext);
    //
    
    if (!ready){
        return <div>Loading...</div>
    }

    if (ready && !user){
        return <Navigate to= {'/login'}/>
    }
    const {subpage} = useParams();
    console.log(subpage);

    function linkClasses(type = null){
        let classes = 'py-2 px-6';
        if (type === subpage || (subpage === undefined && type === 'profile')){
            classes += ' bg-primary text-white rounded-full';
        }
        return classes;
    }

    return(
        <div>
            <nav className='w-full flex justify-center mt-8 gap-10'>
                <Link className = {linkClasses('profile')}  to = '/account'>My Profile</Link>
                <Link className = {linkClasses('bookings')} to = '/account/bookings'>My Bookings</Link>
                <Link className = {linkClasses('listings')} to = '/account/listings'>My Listings</Link>
            </nav>
        </div>
    );
}