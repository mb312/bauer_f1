import { Link } from 'react-router-dom';
import NavLink from './components/NavLink';

const LOGO_URL = "https://media.formula1.com/common/logos/f1_logo_red.svg";
const arrLinks = [{ toLink: "/overviewDrivers", title: 'driver' },
                  { toLink: "/overviewTeams", title: 'team' },
                  { toLink: "/overviewRaces", title: 'races' }]

function PageHeader() {
   return (
      <nav className="nav-bar">
         <section className="nav-container">
            <Link to='/' className="nav-logo"><img src={LOGO_URL} alt="" /></Link>
            <ul className="nav-menu">
               {arrLinks.map((oCurrent, index) => <NavLink oLink={oCurrent} key={index} />)}
            </ul>
            <Link to='/contactMe'><i className="fa-regular fa-pen-to-square"></i></Link>
         </section>
      </nav>
   )
}

export default PageHeader