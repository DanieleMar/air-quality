import {
  AIR_URL,
  API_KEY,
  GET_APP_KEY
} from "../../constant"

export const getListCountry = async () =>{

  try {
    const url = `${AIR_URL}/countries?key=${GET_APP_KEY}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*'

      },
      // mode:'no-cors'


    })
    const data = await response.json()

    console.log('data', data)
    return data
  } catch (err) {
    console.log('error', err); // TypeError: failed to fetch
  }

}

export const getCityAir = async (city, region)=>{

  try {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    const url = `${AIR_URL}/city?city=${city}&state=${region}&country=Italy&key=${API_KEY}`

    const response = await fetch(url, requestOptions)
    const data = await response.json()
    console.log(data)
    return data
  } catch (err) {
    console.log('error', err); // TypeError: failed to fetch
  }
}