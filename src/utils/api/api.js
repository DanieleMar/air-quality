import { AIR_URL, API_KEY } from "../../constant";

const chooseUrl = (what, region, city ) =>{
  let url = "";

  switch (what) {
  case "region": {

     url = `${AIR_URL}/states?country=Italy&key=${API_KEY}`; // get a list of supported regions
     break
  }
  case "list-cities": {

     url = `${AIR_URL}/cities?state=${region}&country=Italy&key=${API_KEY}`; //get a list of cities supported for a specific region
     break
  }
  case "specific-city": {
     url = `${AIR_URL}/city?city=${city}&state=${region}&country=Italy&key=${API_KEY}`; // get info for a specific scity
     break
  }
  default: 
  break
}
return url
}

export const getAir = async (what, city, region) => {
  try {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const url = chooseUrl(what, city, region)
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log(data.data);
    return data;
  } catch (err) {
    console.log("error", err); // TypeError: failed to fetch
  }
};
