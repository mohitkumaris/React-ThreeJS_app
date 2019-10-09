import React from "react";
import { slide as Menu } from "react-burger-menu";

export default props => {
  return (
    // Pass on our props
    <Menu {...props}>
      <a className="menu-item" href="/" onClick={()=>{}}>
        Home
      </a>

      <a className="menu-item" href="/"  onClick={()=>{}}>
        Burgers
      </a>

      <a className="menu-item" href="/" onClick={()=>{}}>
        Pizzas
      </a>

      <a className="menu-item" href="/" onClick={()=>{}}>
        Desserts
      </a>
    </Menu>
  );
};
