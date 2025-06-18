import { useDriverStanding } from "../../context/DriverStandingContext";
import { useTranslation } from "react-i18next";

function DriverTable() {
   const { t } = useTranslation();
   const {arrDriverList, bLoading} = useDriverStanding();
   
   if (bLoading) return <div>t('loading')</div>;
   
   return (
      <table className="table-right-list">
         <tbody>
            {arrDriverList.map((data) => {
               const { position, Driver, Constructors, points } = data;
               const sPosition = position ? ('0' + position).slice(-2) : "--";
               const sDriverName = Driver?.familyName || "--";
               const nConstructorId = Constructors?.[Constructors.length-1]?.constructorId || t('unknown');
               const nDriverId = Driver?.driverId || Math.random();

               return (
                  <tr className={nConstructorId} key={nDriverId}>
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