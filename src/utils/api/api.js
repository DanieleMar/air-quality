import { AIR_URL, API_KEY } from "../../constant";
import axios from "axios";

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
    console.log("error", err); // TypeError: failed to fetch
  }
};

//WITH AXIOS
export const fetchAirAxios = async (what, region, city) => {
  try {
    let url = "";
    let url2= "";
    let getAirParams ={}
    switch (what) {
      case "regions": {
        url2='/states'
        getAirParams= {
        country: "Italy",
        key: API_KEY}
        break;
      }
      case "list-cities": {
        url2='/cities'
        getAirParams= {
          state: region,
          country: "Italy",
          key: API_KEY}
        break;
      }
      case "specific-city": {
        url2='/city'
        getAirParams= {city: city,
          state: region,
          country: "Italy",
          key: API_KEY}
        break;
      }
      default:
        break;
    }

    const response = await axios({
      method: "GET",
      baseURL: "https://api.airvisual.com/v2/",
      url: url2,
      params: getAirParams,
      redirect: "follow",
      // headers: {'Access-Control-Allow-Origin' : '*',
      // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'}
    });
    const data = await response.data;
    return data.data;
  } catch (err) {
    console.log("error", err); // TypeError: failed to fetch
  }
};

const instance = axios.create({
  baseURL: "https://api.airvisual.com/v2",
  timeout: 1000,
  headers: { ContentType: "application/json" },
});
