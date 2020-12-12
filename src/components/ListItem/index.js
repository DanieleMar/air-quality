import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function ListItem(props) {

  const { element, openRegion } = props;
  return <div onClick={openRegion}>{element}</div>;
}
