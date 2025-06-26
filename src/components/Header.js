import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LinkText from './components/LinkText';

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
               {arrLinks.map((oCurrent,index) => <LinkText oLink={oCurrent} key={index} />)}
            </ul>
            <Link to='/contactMe'><i className="fa-regular fa-pen-to-square"></i></Link>
         </section>         
      </nav>
   )
}

export default Header