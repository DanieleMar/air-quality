import { AIR_URL, API_KEY } from "../../constant";
import axios from "axios";
import apiClient from "./apiClient.js";

//WITH FETCH
const chooseUrl = (what, region, city) => {
  let url = "";

  switch (what) {
    case "regions": {
      url = `${AIR_URL}/states?country=Italy&key=${API_KEY}`; // get a list of supported regions
      break;
    }
    case "list-cities": {
      url = `${AIR_URL}/cities?state=${region}&country=Italy&key=${API_KEY}`; //get a list of cities supported for a specific region
      break;
    }
    case "specific-city": {
      url = `${AIR_URL}/city?city=${city}&state=${region}&country=Italy&key=${API_KEY}`; // get info for a specific scity
      break;
    }
    default:
      break;
  }
  return url;
};

export const getAir = async (what, region, city) => {
  try {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const url = chooseUrl(what, city, region);
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log("Errore"); // TypeError: failed to fetch
  }
};

//WITH AXIOS
export const fetchAirAxios = async (what, region, city) => {

  try {
    let url= "";
    let getAirParams ={}
    switch (what) {
      case "regions": {
        url='/states'
        getAirParams= {
        country: "Italy",
        key: API_KEY}
        break;
      }
      case "list-cities": {
        url='/cities'
        getAirParams= {
          state: region,
          country: "Italy",
          key: API_KEY}
        break;
      }
      case "specific-city": {
        url='/city'
        getAirParams= {city: city,
          state: region,
          country: "Italy",
          key: API_KEY}
        break;
      }
      default:
        break;
    }

    //WITHOUT AXIOS CLIENT
    const response = await axios({
      method: "GET",
      baseURL: "https://api.airvisual.com/v2/",
      url: url,
      params: getAirParams,
      redirect: "follow",
      // headers: {'Access-Control-Allow-Origin' : '*',
      // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'}
    });


    /// with AXIOS CLIENT

    // const response = await apiClient.get(url, {params:getAirParams})



    const data = await response.data;
    return data.data;
  } catch (err) {
    // console.log("Errore"); // TypeError: failed to fetch
    // console.log(err.json());
    
    // console.log(err.response);
    // console.log(err.request);
    // console.log(err.message); 

    if (err.message=='Network Error') {console.log('Errore nel prelevare dati dalla API | Network Error')}



  }
};

