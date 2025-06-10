import React, { useState, useRef, useEffect } from "react";

const Countdown = ({ toDate }) => {
   const intervalRef = useRef(null);
   const [timeRemaining, setTimeRemaining] = useState(() =>{
      const now = new Date();
      return Math.max(0, Math.floor((toDate.getTime() - now.getTime()) / 1000));
   });

   useEffect(() => {
      const calculateTimeRemaining = () => {
         const now = new Date();
         return Math.max(0, Math.floor((toDate.getTime() - now.getTime()) / 1000));
     };

      setTimeRemaining(calculateTimeRemaining());
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
         setTimeRemaining((prevTime) => (prevTime <= 1 ? 0 : prevTime - 1));
      }, 1000);

      // Add visibilitychange handler
      const handleVisibility = () => {
         if (document.visibilityState === "visible") {
            setTimeRemaining(calculateTimeRemaining());
         }
      };
      document.addEventListener("visibilitychange", handleVisibility);

      return () => {
         if (intervalRef.current) clearInterval(intervalRef.current);
         document.removeEventListener("visibilitychange", handleVisibility);
      };
   }, [toDate]);

   // convert seconds to days, hours, minutes, seconds
   const days = Math.floor(timeRemaining / (3600 * 24));
   const hours = Math.floor((timeRemaining % (3600 * 24)) / 3600);
   const minutes = Math.floor((timeRemaining % 3600) / 60);
   const seconds = timeRemaining % 60;
   
   return (
      <div className="countdown-timer">
         {days.toString().padStart(2, "0")}:{hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:
         {seconds.toString().padStart(2, "0")}
      </div>
   );
};

export default Countdown;