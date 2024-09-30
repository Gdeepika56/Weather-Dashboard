import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faSun, faCloudRain, faWind, faCloudShowersHeavy, faSnowflake } from "@fortawesome/free-solid-svg-icons";


const HourlyWeather = ({ hourlyData }) => {
  return (
    <div className="hourly-forecast">
      <h3>Hourly Forecast</h3>
      <div className="hourly-container">
        {hourlyData.map((hourlyEntry) => (
          <div key={hourlyEntry.dt} className="hourly-item">
            <div>
              <p>{new Date(hourlyEntry.dt * 1000).toLocaleTimeString()}</p>
              <p>{hourlyEntry.main.temp} °F</p>
              <p>{hourlyEntry.weather[0].main}</p>
        
              {hourlyEntry.weather[0].main === "Clear" && (
                <FontAwesomeIcon icon={faSun} />
              )}
              {hourlyEntry.weather[0].main === "Rain" && (
                <FontAwesomeIcon icon={faCloudRain} />
              )}
              {hourlyEntry.weather[0].main === "HeavyRain" && (
                <FontAwesomeIcon icon={faCloudShowersHeavy} />
              )}
              {hourlyEntry.weather[0].main === "Clouds" && (
                <FontAwesomeIcon icon={faCloud} />
              )}
              {hourlyEntry.weather[0].main === "Wind" && (
                <FontAwesomeIcon icon={faWind} />
              )}
              {hourlyEntry.weather[0].main === "Snow" && (
                <FontAwesomeIcon icon={faSnowflake} />
              )}
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyWeather;
