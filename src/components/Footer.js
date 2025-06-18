const LINK_FACEBOOK = "https://www.facebook.com/share/1AahGkaL5T/?mibextid=wwXIfr";
const LINK_INSTAGRAM = "https://www.instagram.com/michelle__bauer/?igsh=MThtOXVhMThjMW90Zw%3D%3D&utm_source=qr";
const LINK_LINKEDIN = "https://www.linkedin.com/in/michelle-bauer-719033191?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app";

function Footer() {
   const arrLinks = [{name: "facebook", link: LINK_FACEBOOK, className: "fa-brands fa-square-facebook"},
                     {name: "instagram", link: LINK_INSTAGRAM, className: "fa-brands fa-instagram"},
                     {name: "linkedin", link: LINK_LINKEDIN, className: "fa-brands fa-linkedin"}]
   return (
      <footer>
         <div className="footer-container">
            {arrLinks.map((oElement) =>{
               return (
                  <a href={oElement.link} key={oElement.name} target="_blank" rel="noopener noreferrer">
                     <i className={oElement.className}></i>
                  </a>
               )
            })}
            <p className="foot-note">bauer©2025</p>
         </div>
      </footer>
   )
}

export default Footer