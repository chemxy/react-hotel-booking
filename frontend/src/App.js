import './App.css';
import {SearchComponent} from "./components/SearchComponent";
import {NavBar} from "./components/NavBar";

function App() {


    return (
        <div className="container">
            <NavBar></NavBar>
            <SearchComponent></SearchComponent>
        </div>
    );
}

export default App;
