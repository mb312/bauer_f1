import React, { useState, useRef, useEffect } from "react";
import { setZeroInfrontOfNumber } from "../../utilities/UsefullUtils";

const Countdown = ({ dToDate }) => {
   const intervalRef = useRef(null);
  
   const [timeRemaining, setTimeRemaining] = useState(() =>{
      const dNow = new Date();
      return Math.max(0, Math.floor((dToDate.getTime() - dNow.getTime()) / 1000));
   });

   useEffect(() => {
      const calculateTimeRemaining = () => {
         const dNow = new Date();
         return Math.max(0, Math.floor((dToDate.getTime() - dNow.getTime()) / 1000));
     };

      setTimeRemaining(calculateTimeRemaining());
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
         setTimeRemaining((prevTime) => (prevTime <= 1 ? 0 : prevTime - 1));
      }, 1000);

      const handleVisibility = () => {
         if (document.visibilityState === "visible") setTimeRemaining(calculateTimeRemaining());
      };
      document.addEventListener("visibilitychange", handleVisibility);

      return () => {
         if (intervalRef.current) clearInterval(intervalRef.current);
         document.removeEventListener("visibilitychange", handleVisibility);
      };
   }, [dToDate]);

   // convert seconds to days, hours, minutes, seconds
   const nDays = Math.floor(timeRemaining / (3600 * 24));
   const nHours = Math.floor((timeRemaining % (3600 * 24)) / 3600);
   const nMinutes = Math.floor((timeRemaining % 3600) / 60);
   const nSeconds = timeRemaining % 60;
   
   return (
      <div className="countdown-timer">
         {setZeroInfrontOfNumber(nDays)}:
         {setZeroInfrontOfNumber(nHours)}:
         {setZeroInfrontOfNumber(nMinutes)}:
         {setZeroInfrontOfNumber(nSeconds)}
      </div>
   );
};

export default Countdown;