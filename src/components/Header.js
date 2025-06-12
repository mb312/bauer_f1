import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LOGO_URL = "https://media.formula1.com/common/logos/f1_logo_red.svg";

function Header() {
   const { t } = useTranslation();
   const arrLinks = [{toLink: "/overviewDriver", title: t('driver')},
                     {toLink: "/overviewTeams", title: t('team')},
                     {toLink: "/overviewRaces", title: t('races')}]

   return (      
      <nav className="nav-bar">
         <section className="nav-container">
            <Link to='/' className="nav-logo"><img src={LOGO_URL} alt="" /></Link>
            <ul className="nav-menu">
               {arrLinks.map((oCurrent,index) => {
                  return (
                     <li className="nav-item" key={index}>
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