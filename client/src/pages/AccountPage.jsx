import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function AccountPage() {
    const [toHome, setToHome] = useState(null);
    const {ready, user, setUser} = useContext(UserContext);
    
    let {subpage} = useParams();
    if (subpage === undefined){
        subpage = 'profile';
    }

    async function logout(){
        await axios.post('/logout');
        setToHome('/');
        setUser(null);
    
    }
    
    if (!ready){
        return <div>Loading...</div>
    }

    if (ready && !user && !toHome){
        return <Navigate to= {'/login'}/>
    }

    // console.log(subpage);

    function linkClasses(type = null){
        let classes = 'py-2 px-6';
        if (type === subpage){
            classes += ' bg-primary text-white rounded-full';
        }
        return classes;
    }
    if (toHome){
        return <Navigate to={toHome}/>
    }
    return(
        <div>
            <nav className='w-full flex justify-center mt-8 gap-10 mb-8'>
                <Link className = {linkClasses('profile')}  to = '/account'>My Profile</Link>
                <Link className = {linkClasses('bookings')} to = '/account/bookings'>My Bookings</Link>
                <Link className = {linkClasses('listings')} to = '/account/listings'>My Listings</Link>
            </nav>
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged In as {user.name} ({user.email})
                    <div className="mt-4"> {/* Added margin-top to increase the gap */}
                        <button onClick={logout} className="py-2 px-6 bg-primary rounded-full text-white">Logout</button>
                    </div>
                </div>
            )}
        </div>
    );
}