import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    async function loginUser(ev){
        ev.preventDefault();
        try {
            const {data} = await axios.post('/login', {
                email, password
            });
            // console.log(data);
            setUser(data);
            alert('Login successful');
            setRedirect(true);
        }
        catch(e){
            console.log(e);
            alert('Login failed, Please try agian later');
        }
    }

    if (redirect){
        return <Navigate to={'/'}/>
    }

    return(
        <div className="mt-8 grow flex-col min-h-screen">
            <h1 className=" text-3xl text-center mb-4 ">Welcome to Cloudbnb</h1>
            <div className="mt-16 grow flex-col">
                <h2 className=" text-xl text-center mb-4">Log in or sign up</h2>
                <form className="max-w-md mx-auto" onSubmit={loginUser}>
                    <input type="Email" placeholder="Email" value={email} onChange={ev => setEmail(ev.target.value)} />
                    <input type="Password" placeholder="Password" value={password} onChange={ev => setPassword(ev.target.value)}/>
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet? <br></br>
                        <Link className="underline text-black" to={"/register"}>Register Now</Link>
                    </div>
                </form>
                </div>
        </div>
    );
}