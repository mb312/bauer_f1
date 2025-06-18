import React, { useEffect, useState } from "react";

function ButtonJumpTo({ scrollToNextRace, threshold = 200 }) {
   const [bShow, setShow] = useState(true);
   
   useEffect(() => {
      const handleScroll = () => setShow(window.scrollY < threshold);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, [threshold]);
   
   return bShow ? (
      <button className="btn-back-to-top" onClick={scrollToNextRace}>
         <i className="fa-solid fa-angle-down"></i>
      </button>
   ) : null;
}

export default ButtonJumpTo;