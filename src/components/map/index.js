import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon path
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

class CityMap extends Component {
  constructor(props) {
    super(props);
    console.log("propsData",props)
    console.log(props.cityWeather.name);
    this.state = {
      lat: props.cityWeather.coord.lat,
      lon: props.cityWeather.coord.lon,
      cityName: props.cityWeather.name,
      isLoading: true,
    };
  }

  // Fetch city coordinates from OpenWeatherMap API
  componentDidMount() {
    
     this.getCityCoordinates(this.state.cityName)

  }

  getCityCoordinates(city) {
    const apiKey = '43cb9982139dd169fa8c54b44a128b5c'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { coord } = data;
        this.setState({
          lat: coord.lat,
          lon: coord.lon,
          isLoading: false,
        });
      })
      .catch(error => console.error('Error fetching city coordinates:', error));
  }

  render() {
    const { lat, lon, cityName, isLoading } = this.state;

    return (
      <div>
        <h1>Map of {cityName}</h1>
        {isLoading ? (
          <p>Loading map...</p>
        ) : (
          <MapContainer center={[lat, lon]} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[lat, lon]}>
              <Popup>{cityName}</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    );
  }
}

export default CityMap;
