import logo from "./logo.svg";
import "./App.css";
import { getAir } from "./utils/api/api.js";
import ListItem from "./components/ListItem";
import { useEffect, useState } from "react";


function App() {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  const getData = async (what, region, city) => { //fetch data
    const data = await getAir(what, region, city);
    if (data !== undefined) {
      
      if (what==='regions') {
        setRegions(data.data);
      }
      else if (what==='list-cities') {
        console.log('list-cities data', data);
        setCities(data.data)
      }
      
    
    }
  };



  const fetchNextList = async (nextThingToExplore) => { //show the cities of a specific region
    const newDatas = await getData("list-cities", nextThingToExplore);

    setCities(newDatas)
    setRegions({});
  };

  return (
    <div className="App">
      <button onClick={() => getData("regions")}>get list of Regions</button>


      {cities !== undefined && cities.length > 0 //showed list of cities after the list of regions
        ? cities.map((el, index) => {
         
            return (
              <ListItem 
                key={index}
                element={el.city}
                // openRegion={() => fetchNextList(el.city)}
              />
            );
          })
        : regions !== undefined && regions.length > 0
        ? regions.map((el, index) => {
            return (
              <ListItem
                key={index}
                element={el.state}
                openRegion={() => fetchNextList(el.state)}
              />
            );
          })
        : null}
    </div>
  );
}

export default App;
