import axios from "axios";


export default axios.create({

  method: "GET",
  baseURL: "https://api.airvisual.com/v2/",
  redirect: "follow",
  headers: {
    "Access-Control-Allow-Origin":"*",
    "access-control-allow-headers": "Origin, X-Requested-With, Content-Type, Accept",
    common: { "Content-Type": "application/json" },
  },
});
