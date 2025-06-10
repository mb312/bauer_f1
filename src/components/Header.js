import React from 'react';
import { Link } from 'react-router-dom';

const LOGO_URL = "https://media.formula1.com/common/logos/f1_logo_red.svg";
const arrLinks = [{toLink: "/overviewDriver", title: "Driver"},
                  {toLink: "/overviewTeams", title: "Teams"},
                  {toLink: "/overviewRaces", title: "Races"}]

function Header() {
   return (      
      <nav className="nav-bar">
         <section className="nav-container">
            <Link to='/' className="nav-logo"><img src={LOGO_URL} alt="" /></Link>
            <ul className="nav-menu">
               {arrLinks.map((oCurrent,index) => {
                  return (
                     <li className="nav-item">
                        <Link to={oCurrent.toLink} className='nav-link'>{oCurrent.title}</Link>
                     </li>
                  )
               })}
            </ul>
         </section>
      </nav>
   )
}

export default Header