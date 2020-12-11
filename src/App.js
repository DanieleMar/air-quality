import logo from './logo.svg';
import './App.css';
import {getAir} from './utils/api/api.js'

function App() {


  const getTest = (citta) =>{
    console.log('citta.city', citta[0].city) //test
    //  getAir(citta[0].city, citta[0].region)
    getAir('specific-city', 'Lombardy','Brescia') //test: get info about a city
    
  }
  
const citta = { //test object
  0:{
      'city':'Rome',
      'region': 'Lazio'
  }
}
  return (
    <div className="App">
<button onClick={()=> getTest(citta)}>get meteo data of brescia</button>
    </div>
  );
}

export default App;
