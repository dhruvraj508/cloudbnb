import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';

export default function ProfilePage() {
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

    //console.log(subpage);
    
    if (toHome){
        return <Navigate to={toHome}/>
    }

    return(
        <div>
            <AccountNav/>
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged In as {user.name} ({user.email})
                    <div className="mt-4"> {/* Added margin-top to increase the gap */}
                        <button onClick={logout} className="py-2 px-6 bg-primary rounded-full text-white">Logout</button>
                    </div>
                </div>
            )}
            {subpage === 'listings' && (
                <PlacesPage/>
            )}
        </div>
    );
}