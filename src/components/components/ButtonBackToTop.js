import { useEffect, useState } from "react";

function ButtonBackToTop({ threshold = 200 }) {
   const [bShow, setShow] = useState(false);

   useEffect(() => {
      const handleScroll = () => setShow(window.scrollY > threshold);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, [threshold]);

   const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });
   
   return bShow ? (
      <button className="btn-back-to-top" onClick={handleClick}>
         <i className="fa-solid fa-angle-up"></i>
      </button>
   ) : null;
}

export default ButtonBackToTop;