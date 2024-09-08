import React, { Component } from 'react';

import { MdHomeFilled } from "react-icons/md";

import "./index.css";

class Geolocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      weatherData: null,
      errorMessage: null
    };
  }

  componentDidMount() {
    // Get the user's location when the component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.setState({ latitude, longitude }, this.fetchWeather);
        },
        (error) => {
          this.setState({ errorMessage: error.message });
        }
      );
    } else {
      this.setState({ errorMessage: 'Geolocation is not supported by this browser.' });
    }
  }

  fetchWeather = () => {
    const { latitude, longitude } = this.state;
    const apiKey="43cb9982139dd169fa8c54b44a128b5c"
    // Fetch weather data based on latitude and longitude
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ weatherData: data });
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  render() {
    const { latitude, longitude, weatherData, errorMessage } = this.state;

    return (
      <div className="user-weather-bg">
        <div className="user-weather-card">
       
      

        {weatherData ? (
          <div>
            <h2> <MdHomeFilled /> &nbsp; Weather in {weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Condition: {weatherData.weather[0].description}</p>
          </div>
        ) : (
          <p>Fetching weather data...</p>
        )}



{errorMessage && <p>Error: {errorMessage}</p>}
        {latitude && longitude ? (
          <div>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
          </div>
        ) : (
          <p>Getting your location...</p>
        )}




        </div>
      </div>
    );
  }
}

export default Geolocation;
