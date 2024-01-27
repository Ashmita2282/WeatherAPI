import React, { useEffect, useState } from "react";
import "./Weather.css";

export default function Weather() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=2806c8f223266044603bdc8e864e6cad`;
        const response = await fetch(url);
        const resJson = await response.json();
        console.log(resJson);
        setCity(resJson);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (search) {
      fetchApi();
    }
  }, [search]);

  return (
    <div>
    <h1 className="h1">Weather App</h1>
      <div id="container">
      
        <i className="fa fa-map-marker" aria-hidden="true"></i>
        <input
          placeholder="Type city Name"
          type="search"
          className="inputFeild"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          
        />
        <br/>
        {!city ? (
          <div>
          <br/>
          <p>Type the city name to search the wether</p>
          </div>
        ) : (
          <div>
            <h1>{search}</h1>
            {city.main && (
              <>
                <h2>{city.main.temp}</h2>
                <h4>
                  <span id="temp">
                    <sup>o</sup>C
                  </span>
                </h4>
              </>
            )}
            {city.weather && city.weather.length > 0 && (
              <h5>{city.weather[0].description}</h5>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
