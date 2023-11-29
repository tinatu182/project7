import React, { useState } from "react";
import config from "./config";
import './App.css';
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
// import backgroundImg from "../assets/images/background.jpg";


function App() {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return (
        <div className="App">
            {
                currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Signup onFormSwitch={toggleForm} />
            }
        </div>
    );
}

export default App;
