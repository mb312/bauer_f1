import React, { useEffect, useRef } from "react";
import DriverCard from "../components/DriverCard";
import BackToTopButton from "../components/BackToTopButton";
import { useDriverStanding } from "../../context/DriverStandingContext";

function OverviewDriver() {
   const {driverList, loading} = useDriverStanding();
      
   if (loading) return <div>Loading...</div>;
   return (
      <div className="card-list-col-three">
         {driverList.map((data) =>{
            return <DriverCard {...data} key={data.position} />
         })}
         <BackToTopButton />
      </div>      
  )
}

export default OverviewDriver;