import {Route,Switch,Link} from "react-router-dom";

import Home from "./components/home";

import City from "./components/city";

import "./App.css";

function App() {
  return (

    <div>

      <div className="nav-bar">
        <div>
          <Link className="home-link" to="/">Home</Link></div>
        <div>
          <img className="image-app" src="https://i.ibb.co/DCn0HRP/Screenshot-2024-09-17-231704.png" alt="not-found"/>
        </div>
      </div>
  
   <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/city/:cityname" component={City}/>
   </Switch>
   </div>
  
  );
}

export default App;
