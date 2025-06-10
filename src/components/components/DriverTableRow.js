import React from "react";

const DriverTableRow = (props) => {
   const {position,Driver,Constructors,points} = props;
   const sPosition = ('0' + position).slice(-2);
   const sDriverName = Driver.familyName;
   return (
      <tr className={Constructors[0].constructorId}>
         <td>{sPosition}</td>
         <td>{sDriverName}</td>
         <td>{points}</td>
      </tr>
   )
}

export default DriverTableRow;