import React from 'react';
import { Link } from 'react-router-dom';
import "../twicon/twicon.css";
import { citysList } from './allcity';
import {Nav, NavDropdown, NavItem, NavLink} from 'react-bootstrap'
const style = {
  'color': '#17BEBB',
  'fontSize': '30px'
};

const CityItems = citysList.map((city,i) =>
    <NavDropdown.Item key={i} href={'/scenicSpot/' + city}>
        {city}
    </NavDropdown.Item>
) 

const Navbar = () => {
    return (
      <Nav className="navbar navbar-expand-sm navbar-light bg-light">
        <NavItem>
          <Link className="navbar-brand" to="/">
            <i className="twicon-main-island" style={style}/>
          </Link>
        </NavItem>
        <NavItem>
          交通部觀光景點
        </NavItem>
        <NavItem>
          <NavLink href='/scenicSpot'>
            找景點？(全部景點)
          </NavLink>
        </NavItem>
        <NavDropdown title="找縣市？(各別縣市)">
          {CityItems}
        </NavDropdown>
      </Nav>
    );
  };

export { Navbar };