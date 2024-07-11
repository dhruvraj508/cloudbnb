export default function LoginPage(){
    return(
        <div className="mt-8 grow flex-col min-h-screen">
            <h1 className=" text-3xl text-center mb-4 ">Welcome to Cloudbnb</h1>
            <div className="mt-16 grow flex-col">
                <h2 className=" text-xl text-center mb-4">Log in or sign up</h2>
                <form className="max-w-md mx-auto">
                    <input type="Email" placeholder="Email" />
                    <input type="Password" placeholder="Password" />
                    <button className="primary">Login</button>
                </form>
                </div>
        </div>
    );
}