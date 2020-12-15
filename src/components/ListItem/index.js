import React from "react";
import Dropdown from "react-bootstrap/Dropdown";


export default function ListItem(props) {

  const { element, openRegion, len, num} = props;
  return <> <span onClick={openRegion}>{element}</span> {num<len-1 && <span>&diams;</span>}</>;
}
