export default function Perks({selected, onChange}){
    
    function handleClick(ev){
        const {name, checked} = ev.target;
        if (checked){
            onChange([...selected, name]);
        } else {
            onChange([...selected.filter(selectedName => selectedName !== name)]);
        }
        // console.log(ev.target.name);
    }
        
    return(
        <>
            <label className='border p-4 flex rounded-2xl gap-2 items-center'>
                <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleClick} />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                </svg>
                <span>Wi-Fi</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-2 items-center'>
            <input type="checkbox" checked={selected.includes('private')} name="private" onChange={handleClick} />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-closed" viewBox="0 0 16 16">
                    <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3zm1 13h8V2H4z"/>
                    <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0"/>
                </svg>
                <span>Private Entrance</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-2 items-center'>
                <input type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handleClick} />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-p-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002V12h1.283V9.164h1.668C10.033 9.164 11 8.08 11 6.586c0-1.482-.955-2.584-2.538-2.584zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z"/>
                </svg>
                <span>Free Parking</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-2 items-center'>
                <input type="checkbox" checked={selected.includes('laundry')} name="laundry" onChange={handleClick} />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <span>In-Suite Laundry</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-2 items-center'>
                <input type="checkbox" checked={selected.includes('pets')} name="pets" onChange={handleClick} />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 576 512">{/*<!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                    <path d="M309.6 158.5L332.7 19.8C334.6 8.4 344.5 0 356.1 0c7.5 0 14.5 3.5 19 9.5L392 32l52.1 0c12.7 0 24.9 5.1 33.9 14.1L496 64l56 0c13.3 0 24 10.7 24 24l0 24c0 44.2-35.8 80-80 80l-32 0-16 0-21.3 0-5.1 30.5-112-64zM416 256.1L416 480c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-115.2c-24 12.3-51.2 19.2-80 19.2s-56-6.9-80-19.2L160 480c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-230.2c-28.8-10.9-51.4-35.3-59.2-66.5L1 167.8c-4.3-17.1 6.1-34.5 23.3-38.8s34.5 6.1 38.8 23.3l3.9 15.5C70.5 182 83.3 192 98 192l30 0 16 0 159.8 0L416 256.1zM464 80a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z"/>
                </svg>
                <span>Pets</span>
            </label>
        </>
    );
}