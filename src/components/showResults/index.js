import React from 'react'

export default function ShowResults(props) {

    const {showRegion, showCity, lastRegion, city, lastCity, cities, regions, getData, giudizio, ListItem} = props
    return (
    <>
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
            </>
    )
}
