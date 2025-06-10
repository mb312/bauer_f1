import React from "react";
import DriverTableRow from "../components/DriverTableRow";
import '../css/Table.css';

function DriverTable({driverList}){
   return (
      <>
         <table>
            <tbody>
               {driverList.map((data) =>{
                  return <DriverTableRow {...data} key={data.position} />
               })}
            </tbody>
         </table>
      </>
   )
}

export default DriverTable