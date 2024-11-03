export default function BookingComponent({place}){
    return (
        <div className="bg-white border shadow-lg p-4 rounded-2xl mt-4">
                    <div className="text-2xl text-center">
                        <span className="font-semibold">${place.price}</span> night
                    </div>
                    <div className="border rounded-2xl mt-4">
                        <div className="flex">
                            <div className="py-3 px-4 ">
                                <label>Check in:</label>
                                <input type="date" />
                            </div>
                            <div className="py-3 px-4 border-l">
                                <label>Check out:</label>
                                <input type="date" />
                            </div>
                        </div>
                        <div className="py-3 px-4 border-t">
                            <label>Guests:</label>
                            <input type="number" value={1} />
                        </div>
                    </div>
                    <button className="primary mt-4">Reserve</button>
                </div>
    );
}