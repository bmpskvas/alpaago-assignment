import React, { useEffect, useState } from "react";
import "../static/Home.css";
import { getDatabase, ref, onValue, set } from 'firebase/database';
const api = {
    key: '405d4665cb618e868d6673fcbb9015da',
    base: 'https://api.openweathermap.org/data/2.5'
};

function Home() {
    const [city, setCity] = useState("");
    const [tmp, setTmp] = useState("");
    const [weather, setWeather] = useState("");
    const [desc, setDesc] = useState("");
  
    const handle = (e) => {
        setCity(e.target.value);
    };

    const search = async () => {
        try {
            const response = await fetch(`${api.base}/weather?q=${city}&units=metric&APPID=${api.key}`);
            const result = await response.json();
            setTmp(result.main.temp + 'C');
            setWeather(result.weather[0].main);
            setDesc(result.weather[0].description);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <>

            <div className="outer-container">
                <div className="inner-container">
                    <h2 className="title">Weather App</h2>
                    <input
                        className="input-box"
                        onChange={(e) => handle(e)}
                        placeholder="City"
                        name="city"
                        type="text"
                    />
                    <button className="search-button" onClick={search}>Search</button>
                    <div className="result-box">
                        <p className="result">{city}</p>
                        <p className="result">{tmp} </p>
                        <p className="result">{weather}</p>
                        <p className="result">{desc}</p>
                    </div>
                </div>
            </div>

           
            
        </>
    );
}

export default Home;
