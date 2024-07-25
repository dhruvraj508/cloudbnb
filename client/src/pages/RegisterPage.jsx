import { useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function  RegisterPage(){
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    
    async function registerUser(ev){
        ev.preventDefault();
        try {
            await axios.post('/register', {
                name, email, password
            });
            alert('Registration successful, Proceed to login!');
        }
        catch(e){
            alert('Registration failed, User already exists');
        }
        
    }
    return(
        <div className="mt-8 grow flex-col min-h-screen">
            <h1 className=" text-3xl text-center mb-4 ">Welcome to Cloudbnb</h1>
            <div className="mt-16 grow flex-col">
                <h2 className=" text-xl text-center mb-4">Log in or sign up</h2>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text" placeholder="Name" value={name} onChange={ev => setName(ev.target.value)}/>
                    <input type="Email" placeholder="Email" value={email} onChange={ev => setEmail(ev.target.value)}/>
                    <input type="Password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={ev => setPassword(ev.target.value)}/>
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already have an account? <br></br>
                        <Link className="underline text-black" to={"/login"}>Login Now</Link>
                    </div>
                </form>
                </div>
        </div>
    );
}