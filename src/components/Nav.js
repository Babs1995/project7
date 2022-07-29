import React from 'react';
import { NavLink } from  "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
        <ul>
            <li><NavLink to="/cats">Cats</NavLink></li>
            <li><NavLink to="/autumn">Autumn</NavLink></li>
            <li><NavLink to="/coffee">Coffee</NavLink></li>
        </ul>
    </div>
  );
}

export default Nav;