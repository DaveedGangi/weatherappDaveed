

import {Component} from "react";

import {Link} from "react-router-dom";

import { FaSearchLocation } from "react-icons/fa";

import {ThreeDots} from "react-loader-spinner";

import Geolocation from "../geolocation";

import "./index.css";

class Home extends Component{

    state={
        cities:[],
        limit:20,
        offset:0,
        loading:false,
        searchValue:""
    }

    componentDidMount(){
        this.getAllCities();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
      }

    getAllCities=async()=>{
        try{

            this.setState({loading:true});

             const {limit,offset,cities} =this.state

            const url=`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}&offset=${offset}`;
            const options={
                method: 'GET'
            }
            const response=await fetch(url, options);
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            else{
                const data=await response.json();
                console.log(data);
                this.setState({cities:[...cities,...data.results],offset:limit+offset,loading:false});
            }
                
            
        }catch(error){
            console.error('Error:', error);
            this.setState({loading:false});
        }
    }

    handleScroll = () => {
        const { loading } = this.state;
    
        // Check if the user has scrolled near the bottom (e.g., 100px from the bottom)
        if (
          window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100
        ) {
          // Only fetch more data if we're not already loading new data
          if (!loading) {
            this.getAllCities(); // Fetch more cities
          }
        }
      };

      filterCities=async()=>{

        const { searchValue } = this.state;
        console.log(searchValue);
        this.setState({ loading: true }); // Show loading spinner while fetching new data
        if(searchValue.length === 0){
            this.setState({ cities: [] }, () => {
              this.getAllCities(); // Re-fetch all cities if search is cleared
            });
            return
  
        }
    
       
   
        const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=ascii_name like '%25${searchValue}%25'&limit=10`;
        const options = {
          method: 'GET'
        };

        try {
          const response = await fetch(url,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          } else {
            const data = await response.json();
            console.log("filteringData:",data);
            this.setState({ cities: data.results ,loading:false});
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }

      searchCity=(event)=>{
        this.setState({searchValue:event.target.value},()=>{
            this.filterCities();
        });
        
        if(event.target.value.length === 0){
            this.setState({ cities: [] }, () => {
              this.getAllCities(); // Re-fetch all cities if search is cleared
            });
  
        }

      }


      openInNewTab = (e, cityName) => {
        e.preventDefault(); // Prevent the default Link behavior
        window.open(`/city/${cityName}`, "_blank");
      };
    render(){

        const {cities,searchValue,loading} = this.state;

        return(
            <div className="bg-all">
              
                <h1 className="welcome-note"> Welcome to Weather App</h1>


                <Geolocation />

                <div className="search-div">
                    <div>
                    <span className="search-city">
                    <input className="search-input" value={searchValue} onChange={this.searchCity} type="search" placeholder="Search for a city..." />
                    <FaSearchLocation />
                    </span>
                    </div>
                </div>

                <h2 className="cities-text">Cities</h2>
                <div className="table-columns">
                    <div className="column-city-name">City Name</div>
                    <div className="column-city-coutry-name">Country Name</div>
                    <div className="column-city-timezone">Time Zone</div>
                </div>
                <div className="cities-container">


                    {
                        cities.length === 0 && <div className="no-cities-found">
                            <div>
                            <img className="no-cities-found-image" src="https://img.freepik.com/premium-vector/modern-design-concept-no-address_637684-281.jpg?w=740" alt="not-found"/>
                            </div>
                            </div>}
                    

                    {cities.map((city, index)=>(
                        <div className="city-info" key={index}>
                            <div>
                            <Link className="city-link" to={`/city/${city.ascii_name}`}>
                            <div className="city-name" onContextMenu={(e) => this.openInNewTab(e, city.ascii_name)}
                            >{city.ascii_name}</div>
                            </Link>
                            </div>
                            <div className="city-country-name">{city.cou_name_en}</div>
                            <div className="city-timezone">{city.timezone}</div>
                        </div>
                    ))}

                    <div className="loading-spinner">
                        {loading&& <div><ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /></div>
                    }
                    </div>



                </div>
            </div>
        )
    }
}

export default Home;
