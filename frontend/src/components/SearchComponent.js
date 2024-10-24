import {useEffect, useState} from "react";

export function SearchComponent() {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3201/rooms/all", {
            headers: {
                'Content-Type': 'application/json', "Access-Control-Allow-Origin": '*'
            }
        }).then(response => {

            console.log(response);
            return response.json();
        }).then(data => {
            console.log(data);
            console.log(data.rooms);
            setRooms(data.rooms);
        }).catch(error => {
            console.log(error);
        })
    }, []);


    return (
        <div className="container">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active text-capitalize" aria-current="page" href="#hotels">hotels</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-capitalize" aria-current="page" href="#flights">flights</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-capitalize" aria-current="page" href="#cars">cars</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-capitalize" aria-current="page" href="#railways">railways</a>
                </li>
            </ul>
            <div className="border border-top-0 pt-5 p-3 rounded-4 rounded-top-0">
                <div className="d-flex flex-row justify-content-center">
                    <div className="mb-3 w-25 me-3">
                        <div>
                            <label className="form-label text-capitalize">location</label>
                        </div>
                        <div className="d-flex input-group">
                        <span
                            className="material-symbols-outlined input-group-text bg-transparent border-end-0 ">location_on</span>
                            <input type="text" className="form-control border-start-0" placeholder="Location"/>
                        </div>
                    </div>
                    <div className=" mb-3 w-25 me-3">
                        <div>
                            <label className="form-label text-capitalize">check-in</label>
                        </div>
                        <div className="d-flex input-group">
                         <span
                             className="material-symbols-outlined input-group-text bg-transparent border-end-0">date_range</span>
                            <input type="date" className="form-control border-start-0" placeholder="Check-in date"/>
                        </div>
                    </div>
                    <div className=" mb-3 w-25 me-3">
                        <div>
                            <label className="form-label text-capitalize">check-out</label>
                        </div>
                        <div className="d-flex input-group">
                         <span
                             className="material-symbols-outlined input-group-text bg-transparent border-end-0">date_range</span>
                            <input type="date" className="form-control border-start-0" placeholder="Check-out date"/>
                        </div>
                    </div>
                    <div className="input-group mb-3 w-25 me-3">
                        <div>
                            <label className="form-label text-capitalize">Person</label>
                        </div>
                        <div className="d-flex input-group">
                        <span
                            className="material-symbols-outlined input-group-text bg-transparent border-end-0">person</span>
                            <input type="text" className="form-control border-start-0" placeholder="Person"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="">
                {rooms.map(room => {
                    return (<div>
                        <h1>{room.roomid}</h1>
                        <h2>{room.name}</h2>
                        <img src={room.image} alt=""/>
                    </div>)
                })}
            </div>
        </div>
    );
}