import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3201/rooms/all", {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": '*'
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
        <div className="App">
            dsadsa
            {rooms.map(room => {
                return (
                    <div>
                        <h1>{room.roomid}</h1>
                        <h2>{room.name}</h2>
                        <img src={room.image}/>
                    </div>
                )
            })}
        </div>
    );
}

export default App;
