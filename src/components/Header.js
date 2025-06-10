import React from 'react';
import { Link } from 'react-router-dom';
import NavigationItem from './components/NavigationItem';

const LOGO_URL = "https://media.formula1.com/common/logos/f1_logo_red.svg";

function Header() {
   return (      
      <nav className="nav-bar">
         <section className="nav-container">
            <Link to='/' className="nav-logo"><img src={LOGO_URL} alt="" /></Link>
            <ul className="nav-menu">
               <NavigationItem toLink='/overviewDriver' displayName='Drivers' />
               <NavigationItem toLink='/overviewTeams' displayName='Teams' />
               <NavigationItem toLink='/overviewRaces' displayName='Races' />
            </ul>
         </section>
      </nav>
   )
}

export default Header