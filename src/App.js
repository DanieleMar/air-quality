import logo from './logo.svg';
import './App.css';
import {getCityAir} from './utils/api/api.js'

function App() {


  const getTest = () =>{
     getCityAir('Brescia', 'Lombardy')
    
  }
  return (
    <div className="App">
<button onClick={()=> getTest()}>get meteo data of brescia</button>
    </div>
  );
}

export default App;
