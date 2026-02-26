import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavLink from './components/NavLink';
import logo from '../assets/images/logo.png';

function PageHeader() {
   const { t } = useTranslation();
   const arrLinks = [{ toLink: "/overviewDrivers", title: t('driver') },
                     { toLink: "/overviewTeams", title: t('team') },
                     { toLink: "/overviewRaces", title: t('races') }]

   return (
      <nav className="nav-bar">
         <section className="nav-container">
            <Link to='/' className="nav-logo"><img src={logo} alt="" /></Link>
            <ul className="nav-menu">
               {arrLinks.map((oCurrent, index) => <NavLink oLink={oCurrent} key={index} />)}
            </ul>
            <Link to='/contactMe'><i className="fa-regular fa-pen-to-square"></i></Link>
         </section>
      </nav>
   )
}

export default PageHeader