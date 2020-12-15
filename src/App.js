import logo from "./logo.svg";
import "./App.css";
import { getAir, fetchAirAxios } from "./utils/api/api.js";
import ListItem from "./components/ListItem";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Search from "./components/searchBox/index.js";

function App() {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});
  const [showRegion, setShowRegion] = useState(false);
  const [lastRegion, setLastRegion] = useState("Nessuna");
  const [showCity, setShowCity] = useState(false);

  const getData = async (what, region, city) => {
    //fetch data
    const data = await fetchData(what, region, city);
    if (data !== undefined) {
      if (what === "regions") {
        setShowRegion(true);
        setRegions(data);
      } else if (what === "list-cities") {
        setShowRegion(false);

        setLastRegion(region); //save the region for the specific-city param
        setShowCity(false); //avoid showing data of previous city (after select region) when user repeat a selection
        setCities(data);
        setRegions([]);
      } else if (what === "specific-city") {
        setCity(data.current);
        setCities([]);
        setShowCity(true);
      }
    }
  };
  const fetchData = async (what, region, city) => {

    ////HOW TO GET VALUES FROM PROMISE SUCCESS
    const fetchData = await fetchAirAxios(what, region, city)
      .then((response) => response) 
      .then((data) => data); 

     return fetchData
  };

  return (
    <div className="App">
      <header>
        {" "}
        <h1>Air Quality</h1>{" "}
        <h2>Scopri la qualità dell'aria per molte città italiane</h2>{" "}
      </header>
      <section>
        <Search />
        <section>
          <Button variant="primary" onClick={() => getData("regions")}>
            Select a Region
          </Button>{" "}
        </section>
      </section>

      {!showRegion && !showCity && (
        <div> Regione selezionata: {lastRegion} </div>
      )}
      {!showRegion && showCity && city !== undefined && (
        <>
          <h3></h3>
          <div>Qualità dell'aria: {city.pollution.aqius} (U.S. AQI)</div>

          <div>Temperatura: {city.weather.tp} °C</div>
          <div>Pressione atmosferica: {city.weather.pr} hPa</div>
          <div>Umidità: {city.weather.hu} %</div>

          <div>Velocità del vento: {city.weather.ws} (m/s)</div>
          <div>Icona: {city.weather.ic} </div>
        </>
      )}

  
      {!showRegion &&
        cities !== undefined &&
        cities.length > 0 && //showed list of cities after the list of regions
        cities.map((el, index) => {
          return (
            <ListItem
              key={index}
              num={index} //to avoid last rhombus simbol
              element={el.city}
              openRegion={() => getData("specific-city", lastRegion, el.city)}
              len={cities.length} //to avoid last rhombus simbol
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
              num={index} //to avoid last rhombus simbol
              element={el.state}
              openRegion={() => getData("list-cities", el.state)}
              len={regions.length} //to avoid last rhombus simbol
            />
          );
        })}
    </div>
  );
}

export default App;
