import {Route,Switch} from "react-router-dom";

import Home from "./components/home"

import City from "./components/city"

function App() {
  return (
   <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/city/:cityname" component={City}/>
   </Switch>
  );
}

export default App;
