import React, { useEffect, useRef } from "react";
import { useDriverStanding } from "../../context/DriverStandingContext";

function DriverTable() {
   const {driverList, loading} = useDriverStanding();
   
   if (loading) return <div>Loading...</div>;
   
   return (
      <table className="table-right-list">
         <tbody>
            {driverList.map((data) => {
               const { position, Driver, Constructors, points } = data;
               const sPosition = position ? ('0' + position).slice(-2) : "--";
               const sDriverName = Driver?.familyName || "--";
               const constructorId = Constructors?.[Constructors.length-1]?.constructorId || "unknown";
               const driverId = Driver?.driverId || Math.random();

               return (
                  <tr className={constructorId} key={driverId}>
                     <td>{sPosition}</td>
                     <td>{sDriverName}</td>
                     <td>{points ?? "--"}</td>
                  </tr>
               )
            })}
         </tbody>
      </table>
   )
}

export default DriverTable