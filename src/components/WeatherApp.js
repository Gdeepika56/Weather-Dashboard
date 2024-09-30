import React, { useState, useEffect } from "react";
import axios from "axios";
import Forecast from "./Forecast";
import HourlyWeather from "./HourlyWeather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCloud,faSun,faCloudShowersHeavy,faWind,faSnowflake,} from "@fortawesome/free-solid-svg-icons";
import SearchHistory from "./history";

//To get Icons //

const getWeatherIcon = (description) => {
  switch (description.toLowerCase()) {
    case "clouds":
      return faCloud;
    case "rain":
      return faCloudShowersHeavy;
    case "clear":
      return faSun;
    case "Wind":
      return faWind;
    default:
      return null;
  }
};

const getTemperatureIcon = (temperature) => {
  if (temperature < 50) {
    return faSnowflake;
  } else if (temperature >= 50 && temperature < 75) {
    return faCloud;
  } else {
    return faSun;
  }
};

const Description = ({ description }) => {
  const weatherIcon = getWeatherIcon(description);
};

//Method for Search loaction//

function WeatherApp() {
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState("");
  const [forecastData, setForecastData] = useState();
  const [expandedDay, setExpandedDay] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  const API_KEY = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=c0235e95489714315ef53ce01501ee96`;

  //method to get searchhistory //
  useEffect(() => { 
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const saveSearchHistory = (history) => {
    localStorage.setItem("searchHistory", JSON.stringify(history));
  };

  const removeSearchHistory = (index) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
    saveSearchHistory(updatedHistory);
  };

   //method to get previous history location //
   const handleSearchLocation = (searchItem) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchItem}&units=imperial&appid=c0235e95489714315ef53ce01501ee96`)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchItem}&units=imperial&appid=c0235e95489714315ef53ce01501ee96`)
      .then((response) => {
        setForecastData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });
  };

  //method to get searchLocation//
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      if (!location || location.trim() === "") {
        alert("please enter a valid city name");
      }
      axios.get(API_KEY).then((response) => {
        console.log(response.data);
        setWeatherData(response.data);

        setSearchHistory((prevHistory) => {
          const newHistory = [...prevHistory, location];
          saveSearchHistory(newHistory);
          return newHistory;
        });
      });
      setLocation("");
    }
  };

  //Method to get the Forecast data//

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        if (location) {
          const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=c0235e95489714315ef53ce01501ee96`
          );

          if (forecastResponse.data && forecastResponse.data.list) {
            setForecastData(forecastResponse.data);
          } else {
            console.error("API response does not contain 'list' property.");
          }
        }
      } catch (error) {
        console.error("error fetching forecast data", error);
      }
    };

    if (location) {
      fetchForecast();
    }
  }, [location, API_KEY]);

  const changeLocation = (e) => {
    setLocation(e.target.value);
  };
//group the forecast data with days //
  const groupedForecast = {};

  if (forecastData && forecastData.list) {
    for (let i = 0; i < forecastData.list.length; i++) {
      const forecastEntry = forecastData.list[i];
      const date = new Date(forecastEntry.dt * 1000);
      const day = date.toDateString();

      if (!groupedForecast[day]) {
        groupedForecast[day] = [];
      }

      groupedForecast[day].push(forecastEntry);
    }
  }

  // To set current date and time//
  const current = new Date();
  // const date = `${current.getDate()}/${current.getMonth() +
  //   1}/${current.getFullYear()}`;
  const time = current.toLocaleString() + "";

  //to handle the hourly data//

  const handleDayClick = (day) => {
    if (expandedDay === day) {
      setExpandedDay(null);
      setHourlyData([]);
    } else {
      setExpandedDay(day);
      const selectedDayData = forecastData.list.filter(
        (entry) =>
          new Date(entry.dt * 1000).toDateString() ===
          new Date(day).toDateString()
      );
      setHourlyData(selectedDayData);
    }
  };

  return (
    <div className="container">
      
      <div className="search-container">
        <input
          type="text"
          onKeyPress={searchLocation}
          value={location}
          onChange={changeLocation}
          className="search-input"
          placeholder="Enter city name"
        />
    
        <SearchHistory history={searchHistory} onRemove={removeSearchHistory} onSearchLocation={handleSearchLocation}/>

      </div>
      <div className="searched-result mx-left p-5">
        <div>
          <p>
            {weatherData.name}{" "}
            {weatherData.sys ? <span>{weatherData.sys.country}</span> : null}
          </p>

          <div className="flex" style={{ justifyContent: "space-between" }}>
            <div>
              <p> Current weather </p>
              <p>{time}</p>
            </div>
          </div>
          <div className="temp">
            {weatherData.main ? (
              <p>
                <FontAwesomeIcon
                  icon={getTemperatureIcon(weatherData.main.temp)}
                />
                <span className="temperature-value">
                  {weatherData.main.temp}
                  <span>&#8457;</span>
                </span>
              </p>
            ) : null}
          </div>
          {weatherData.name !== undefined && (
            <div className="bottom">
              <div className="Description">
                {getWeatherIcon && (
                  <p>
                    <FontAwesomeIcon icon={getWeatherIcon} /> {Description}
                  </p>
                )}
              </div>
              <div className="description1">
                <div className="feels">
                  {weatherData.main ? (
                    <p className="text-center">
                      <p className="text-center">Feels like</p>
                      {weatherData.main.feels_like.toFixed()}
                      <span>&#8457;</span>{" "}
                    </p>
                  ) : null}
                </div>
                <div className="humidity">
                  {weatherData.main ? (
                    <p className="text-center">
                      <p>Humidity</p>
                      {weatherData.main.humidity.toFixed()}%
                    </p>
                  ) : null}
                </div>
                <div className="wind">
                  <p>Wind Speed</p>
                  <p>{weatherData.wind.speed}MPH</p>

                  <p className="text-center"></p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {forecastData && (
        <Forecast
          groupedForecast={groupedForecast}
          handleDayClick={handleDayClick}
          expandedDay={expandedDay}
          hourlyData={hourlyData}
        />
      )}

      {hourlyData.length > 0 && (
        <div className="horly-forecast-container">
          <HourlyWeather hourlyData={hourlyData} />
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
