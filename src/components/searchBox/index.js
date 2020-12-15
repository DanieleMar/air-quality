import React, { useState } from "react";
import Button from "react-bootstrap/Button";


const Search = () => {
    const [value, setValue] = useState('')
    const getValue=(e)=>{
     setValue(e.target.value);   
    }
  return (
    <div>
      <input onChange={getValue} placeholder="About pollution"></input>


    <Button onClick={()=>console.log(value)}>Search the city</Button>
    </div>
  );
};

export default Search;
