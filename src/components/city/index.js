

import {Component} from "react";

import { Link } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { ThreeDots } from "react-loader-spinner";

import { IoChevronBackCircle } from "react-icons/io5";

import "./index.css";



// Fix for default marker icon path
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});





class City extends Component{

    state={
        cityWeather:{},
        lat: null,
        lon: null,
        isLoading: true,
        cityName:null,
        loading:true
    }

    componentDidMount(){
        this.getCityWeather();
        
    }

    getCityWeather=async()=>{
        try{

            this.setState({
            loading:true
            })
            const key="43cb9982139dd169fa8c54b44a128b5c"
            console.log(this.props);
            const{match} = this.props;
            const {params} = match;
            const {cityname} =params;
           
            console.log(`Getting weather for ${cityname}`);
            const url=`http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}`
            const options={
                method:"GET"
            }
           
            const response=await fetch(url,options);
            if(response.ok){
            
            const data=await response.json();
            console.log("data",data);
            console.log("response",response)
            
            this.setState({cityWeather:data,lat:data.coord.lat,lon:data.coord.lon,cityName:data.name,loading:false},()=>{
                this.getCityCoordinates(data.name);
            });
            }
            else{
                console.error("Error fetching data");
            }
        }catch(error){
            console.error(error);
        }
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


  



    render(){
        const {cityWeather,lat, lon, cityName, isLoading,loading}=this.state;

        return(

            <div className="bg-all-weather-information">

           

            {
                loading===true?
                <div className="loading">
                <div>
                    <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#fefae0"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />

                </div>
                </div>
            :
            




            <div>
                {
                    cityWeather.name &&
                    <div>

                        <div className="bg-weather-card">

                        <div className="weather-card">
                        <div className="city"> {cityWeather.name}, {cityWeather.sys.country}</div>

                        <div className="weather">Weather: {cityWeather.weather[0].main}- {cityWeather.weather[0].description}</div>

                        <div className="temp">Temp: {(cityWeather.main.temp-273.15).toFixed(1)}&deg;C</div>
                        <div className="feels-like">Feels Like: {(cityWeather.main.feels_like-273.15).toFixed(1)}&deg;C</div>

                        <div className="humidity">Humidity: {cityWeather.main.humidity}%</div>
                        <div className="pressure">Pressure: {cityWeather.main.pressure} hpa</div>

                        <div className="wind-speed">Wind Speed: {cityWeather.wind.speed} m/s</div>

                        
                        <div>
                             <img className="weather-icon" src={`http://openweathermap.org/img/w/${cityWeather.weather[0].icon}.png`} alt="not-found"/>
                        </div>

                        </div>

                        </div>

                        <div className="info-weather">

                        <div>Base: {cityWeather.base}</div>

                        <div className="max">Temp Max: {(cityWeather.main.temp_max-273.15).toFixed(1)} &deg;C</div>
                        <div className="min">Temp Min: {(cityWeather.main.temp_min-273.15).toFixed(1)} &deg;C</div>
                        <div>Cod: {cityWeather.cod}</div>
                        <div>Lon: {cityWeather.coord.lon}</div>
                        <div>Lat: {cityWeather.coord.lat}</div>
                        <div>Dt: {new Date(cityWeather.dt*1000).toUTCString()}</div>
                        
                        <div>Wind Deg: {cityWeather.wind.deg}&deg;</div>
                        <div>Wind Gust: {cityWeather.wind.gust} m/s</div>
                      
                        <div>Ground Level: {cityWeather.main.grnd_level} hPa</div>
                        <div>Sea Level: {cityWeather.main.sea_level} hPa</div>
                        <div>Time Zone: {cityWeather.timezone}</div>
                        </div>
                      
                    <div className="bg-cards-images">
                        <div className="cards-images">
                       
                        <div className="clouds">
                            <div>
                                <img className="clouds-image" src="https://i.pinimg.com/1200x/4b/19/8d/4b198dba525e60244ba016fc72e1a784.jpg" alt="not-found"/>
                            </div>
                            
                            Clouds: {cityWeather.clouds.all}
                        </div>
                        
                        <div className="sunrise-card">
                            <div>
                                <img className="sunrise" src="https://i.pinimg.com/1200x/08/9e/b5/089eb58a691d72c3147559abbc295eb5.jpg" alt="not-found"/>
                            </div>
                            Sunrise: {new Date(cityWeather.sys.sunrise*1000).toUTCString()}
                        </div>

                        <div className="sunset-card">
                            <div>
                                <img className="sunset" src="https://i.pinimg.com/1200x/22/90/f9/2290f9190b3ac2f967c777d9dd6c2d90.jpg" alt="not-found"/>
                            </div>
                            Sunset: {new Date(cityWeather.sys.sunset*1000).toUTCString()}
                        </div>

                        <div className="visibility-card">
                            <div>
                                <img className="visibility" src="https://images.pexels.com/photos/6494918/pexels-photo-6494918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="not-found"/>
                            </div>
                            
                            Visibility: {cityWeather.visibility} meters
                        </div>


                        </div>
                    </div>




                        
                     

                        
                        
                        
                       



                    
                    </div>
                }
            </div>

            
            }

























           {
            isLoading===false&&
            <div>

            <h1 className="map-city-name">Map of {cityName}</h1>
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

<div>
            <Link to="/" className="button-back-link">
            <button className="button-back" type="button">
               
                <span className="icon-back">
                <IoChevronBackCircle /> &nbsp;
                </span>
                <span className="button-text">Back to Home
                </span>
              


                </button>
            </Link>
           </div>
          
            
            
            </div>
           }


           
               

            </div>
        )
    }
}

export default City;




