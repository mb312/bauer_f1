import React from 'react';

const LINK_INSTAGRAM = "https://www.instagram.com/michelle__bauer/?igsh=MThtOXVhMThjMW90Zw%3D%3D&utm_source=qr";
const LINK_FACEBOOK = "https://www.facebook.com/share/1AahGkaL5T/?mibextid=wwXIfr";
const LINK_LINKEDIN = "https://www.linkedin.com/in/michelle-bauer-719033191?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app";

function Footer() {
   return (
      <footer>
         <div className="footer-container">
            <a href={LINK_FACEBOOK} target="_blank" rel="noopener noreferrer">
               <i className="fa-brands fa-square-facebook"></i>
            </a>
            <a href={LINK_INSTAGRAM} target="_blank" rel="noopener noreferrer">
               <i className="fa-brands fa-instagram"></i>
            </a>
            <a href={LINK_LINKEDIN} target="_blank" rel="noopener noreferrer">
               <i className="fa-brands fa-linkedin"></i>
            </a>
            <p className="foot-note">bauer©2025</p>
         </div>
      </footer>
   )
}

export default Footer