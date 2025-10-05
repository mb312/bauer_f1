import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getDriverBGImageURL, getDriverHelmetImageURL, getDriverName, getDriverNumber } from "../utilities/driverUtils";
import { getDateFormation } from "../utilities/UsefullUtils";
import ButtonBack from '../components/components/ButtonBack';
import '../styles/DriverDetail.css';

function DetailDriver() {
   const {t} = useTranslation();
   const {state} = useLocation();
   const {driver, constructor, oRanking} = state || {};
   
   const sDriverName = getDriverName(driver);
   const oTeamColor = { borderBottom: `3px solid var(--color-${constructor.constructorId})` };
   const oTeamColorSlim = { borderBottom: `1px solid var(--color-${constructor.constructorId})` };
   const oDriverInfo = [{title: t("nationality"),value:driver.nationality},
                        {title: t("birthday"),value:getDateFormation(driver.dateOfBirth)},
                        {title: t("team"),value:constructor?.name},
                        {title: t("position"),value: oRanking.position},
                        {title: t("points"),value: oRanking.points}]

   return (    
      <div className="full-container">
         <ButtonBack />
         <div className="detail-card">
            <div className="card-detail-left">
               <img src={getDriverBGImageURL(driver)} alt={`${sDriverName} portrait`} loading="lazy" />
            </div>
            <div className="card-detail-right">
               <div className="card-header" style={oTeamColor}>
                  <div className="name">{sDriverName}</div>
                  <div className="number">{getDriverNumber(driver)}</div>
               </div>
               {oDriverInfo.map((data,index) => {
                  return (
                     <div className="card-detail-line" style={oTeamColorSlim} key={index}>
                        <div className="card-title">{data.title}</div>
                        <div className="card-value">{data.value}</div>
                     </div>
                  )
               })}
               <div className="card-footer">
                  <img src={getDriverHelmetImageURL(driver)} alt={`${sDriverName} helmet`} loading="lazy" />
               </div>
            </div>
         </div>
      </div>
   );
}
export default DetailDriver