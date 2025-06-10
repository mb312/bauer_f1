import React from "react";

function DriverTable({driverList}){
   return (
      <>
         <table>
            <tbody>
               {driverList.map((data,index) =>{
                  const {position,Driver,Constructors,points} = data;
                  const sPosition = ('0' + position).slice(-2);
                  const sDriverName = Driver.familyName;
                  return (
                     <tr className={Constructors[0].constructorId} key={index}>
                        <td>{sPosition}</td>
                        <td>{sDriverName}</td>
                        <td>{points}</td>
                     </tr>
                  )
               })}
            </tbody>
         </table>
      </>
   )
}

export default DriverTable