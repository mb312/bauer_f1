import React from "react";
import '../css/DriverDetail.css';
import { useLocation, useNavigate } from "react-router-dom";
import { getDriverBGImageURL, getDriverHelmetImageURL, getDriverName, getDrivernumber } from "../../utilities/driverUtils";
import { getDateFormation } from "../../utilities/usefullUtils";
import { useTranslation } from "react-i18next";

function DriverDetail() {
   const navigate = useNavigate();
   const {state} = useLocation();
   const {driver, constructor, position, points} = state || {};
   const sDriverName = getDriverName(driver);
   const teamColor = { borderBottom: `3px solid var(--color-${constructor.constructorId})` };
   const teamColorSlim = { borderBottom: `1px solid var(--color-${constructor.constructorId})` };
   const {t} = useTranslation();
   const oDriverInfo = [{title: t("nationality"),value:driver.nationality},
                        {title: t("birthday"),value:getDateFormation(driver.dateOfBirth)},
                        {title: t("team"),value:constructor?.name},
                        {title: t("position"),value:position},
                        {title: t("points"),value:points}]

   return (    
      <div className="full-container">
         <i className="fa-solid fa-arrow-left" onClick={()=>navigate(-1)}></i>
         <div className="detail-card">
            <div className="card-detail-left">
               <img src={getDriverBGImageURL(driver)} alt={`${sDriverName} portrait`} loading="lazy" />
            </div>
            <div className="card-detail-right">
               <div className="card-header" style={teamColor}>
                  <div className="name">{sDriverName}</div>
                  <div className="number">{getDrivernumber(driver)}</div>
               </div>
               {oDriverInfo.map((data,index) => {
                  return (
                     <div className="card-detail-line" style={teamColorSlim} key={index}>
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
export default DriverDetail
