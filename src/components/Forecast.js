import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faSun, faCloudShowersHeavy, faCloudRain, faSnowflake, faWind } from "@fortawesome/free-solid-svg-icons";


const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Forecast = ({ groupedForecast, handleDayClick, expandedDay }) => {
  return (

    <div className="forecast">
      <br></br>
      <h2>5-day Forecast</h2>
      <div className="forecast-days">
        {Object.entries(groupedForecast).map(([day, entries]) => (
          <div key={day} className="forecast-day">
            <h4 onClick={() => handleDayClick(day)}>
              {WEEK_DAYS[new Date(entries[0].dt * 1000).getDay()]}
            </h4>
            {expandedDay === day && (
              <div className="forecast-details">
                <div>
                  <p>Date: {new Date(entries[0].dt * 1000).toLocaleDateString()}</p>
                  {entries.map((forecastEntry, index) => (
                    <div key={forecastEntry.dt}>
                      {index === 0 && (
                        <div>
                          <p>Temperature: {forecastEntry.main.temp} °F</p>
                          <p>Description: {forecastEntry.weather[0].main}</p>
                          {forecastEntry.weather[0].main === "Clear" && (
                            <FontAwesomeIcon icon={faSun} />
                          )}
                          {forecastEntry.weather[0].main === "Rain" && (
                            <FontAwesomeIcon icon={faCloudRain} />
                          )}
                          {forecastEntry.weather[0].main === "HeavyRain" && (
                            <FontAwesomeIcon icon={faCloudShowersHeavy} />
                          )}
                          {forecastEntry.weather[0].main === "Clouds" && (
                            <FontAwesomeIcon icon={faCloud} />
                          )}
                          {forecastEntry.weather[0].main === "Wind" && (
                            <FontAwesomeIcon icon={faWind} />
                          )}
                          {forecastEntry.weather[0].main === "Snow" && (
                            <FontAwesomeIcon icon={faSnowflake} />
                          )}
                        </div>

                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

  );
};

export default Forecast;
