import React from "react";
import DriverCard from "../components/DriverCard";
import "../css/ListCard.css";

function OverviewDriver({driverList}) {
   return (
      <>
         <div className="card-list-col-three">
            {driverList.map((data) =>{
               return <DriverCard {...data} key={data.position} />
            })}
         </div>
      </>
  )
}

export default OverviewDriver;