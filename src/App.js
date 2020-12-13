import logo from "./logo.svg";
import "./App.css";
import { getAir } from "./utils/api/api.js";
import ListItem from "./components/ListItem";
import { useEffect, useState } from "react";

function App() {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [showRegion, setShowRegion] = useState(false);

  const getData = async (what, region, city) => {
    //fetch data
    const data = await getAir(what, region, city);
    if (data !== undefined) {
      if (what === "regions") {
        setShowRegion(true)
        setRegions(data.data);
      } else if (what === "list-cities") {
        console.log("list-cities data", data);
        setShowRegion(false)


        setCities(data.data);
        setRegions([]);
      } else if (what === "specific-city") {
        console.log(data.data);
        setCity(data.data);
      }
    }
  };

  return (
    <div className="App">
      <button onClick={() => getData("regions")}>get list of Regions</button>
      <button onClick={() => getData("specific-city", "Lombardy", "Brescia")}>
        get brescia
      </button>
      {/* {city !== undefined && city.length > 0  ? } */}

      {!showRegion &&
        cities !== undefined &&
        cities.length > 0 && //showed list of cities after the list of regions
        cities.map((el, index) => {
          return (
            <ListItem
              key={index}
              element={el.city}
              // openRegion={() => fetchNextList(el.city)}
            />
          );
        })}
      {showRegion &&
        regions !== undefined &&
        regions.length > 0 &&
        regions.map((el, index) => {
          return (
            <ListItem
              key={index}
              element={el.state}
              openRegion={() => getData("list-cities", el.state)}
            />
          );
        })}
    </div>
  );
}

export default App;
