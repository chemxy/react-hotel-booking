import logo from './logo.svg';
import './App.css';
import { useEffect } from "react";

function App() {

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
            console.log(data.rooms)
        }).catch(error => {
            console.log(error);
        })
    }, []);


    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
