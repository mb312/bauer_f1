import React from "react";
import { Link } from "react-router-dom";

const NavigationItem = (props) => {
   return (
      <>
         <li className="nav-item">
            <Link to={props.toLink} className='nav-link'>{props.displayName}</Link>
         </li>
      </>
   )

}
export default NavigationItem