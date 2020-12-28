import logo from "./logo.svg";
import "./App.css";
import { getAir, fetchAirAxios } from "./service/api/api.js";
import ListItem from "./components/ListItem";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Search from "./components/searchBox/index.js";
import data from './datas/citiesJson/Apulia.json'
import region from './datas/regions.json'

function App() {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});
  const [showRegion, setShowRegion] = useState(false);
  const [lastRegion, setLastRegion] = useState("Nessuna");
  const [showCity, setShowCity] = useState(false);
  const [lastCity, setLastCity] = useState("");

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
        setLastCity(city);
        setCities([]);
        setShowCity(true);
      }
    }
  };


  // Fetch Data with Axios and Await
  const fetchData = async (what, region, city) => {
    ////HOW TO GET VALUES FROM PROMISE SUCCESS
    const fetchData = await fetchAirAxios(what, region, city)
    const data = await fetchData  
    return data;
  };
  const giudizio = (value) => {
    let valutation = "";
    switch (true) {
      case value <= 50:
        valutation = "Buona";
        break;

      case value > 50 && value <= 100:
        valutation = "Moderata";
        break;
      case value > 100 && value <= 150:
        valutation = "Buona";
        break;
      case value > 150 && value <= 200:
        valutation = "Dannosa";
        break;
      case value > 200 && value <= 300:
        valutation = "Pericolosa";
        break;
      case value > 300 && value <= 500:
        valutation = "Molto pericolosa";
        break;
      default:
        valutation = "";
        break;
    }
    return valutation;
  };

  return (
    <div className="App">
      <header>
        {" "}
        <h1>Air Quality</h1>{" "}
        <h2>Scopri la qualità dell'aria per molte città italiane</h2>{" "}
      </header>
      <section>
        {/* <Search /> */}
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
          <h3>{lastCity}</h3>
          <div>Qualità dell'aria: {city.pollution.aqius} U.S. AQI </div>
          <div>Giudizio: {giudizio(city.pollution.aqius)}</div>
          <br></br>
          <div>Temperatura: {city.weather.tp} °C</div>
          <div>Pressione atmosferica: {city.weather.pr} hPa</div>
          <div>Umidità: {city.weather.hu} %</div>

          <div>Velocità del vento: {city.weather.ws} (m/s)</div>
          {/* <div>Icona: {city.weather.ic} </div> */}
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

        <div>{data.map((el, index) =>{ // FETCH cities and regions FROM LOCAL FILES INSTEAD FROM API
          console.log(el.city)
          console.log(region)
        })}</div>
    </div>
  );
}

export default App;
