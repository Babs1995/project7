import React, { Component } from 'react';
import { NavLink } from  "react-router-dom";

class Nav extends Component {
  render(){
  return (
    <nav className="main-nav">        
    <ul>
            <li><NavLink to="/cats">Cats</NavLink></li>
            <li><NavLink to="/autumn">Autumn</NavLink></li>
            <li><NavLink to="/coffee">Coffee</NavLink></li>
        </ul>
    </nav>
    );
  }
}

export default Nav;