import { Link } from "react-router-dom"

function LinkText({oLink}) {
   return (
      <li className="nav-item">
         <Link to={oLink.toLink} className='nav-link'>{oLink.title}</Link>
      </li>
   )

}
export default LinkText