import React from "react";
import '../css/DetailTeam.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getDriversForTeam, getTeamLogoURL } from "../../utilities/constructorUtils";
import { getDriverBGImageURL, getDriverImageURL } from "../../utilities/driverUtils";

function DetailTeam() {
   const navigate = useNavigate();
   const { state } = useLocation();
   const { constructor } = state || {};
   const oConstructor = constructor.Constructor;
   const sConstructorId = oConstructor.constructorId;
   const arrDrivers = getDriversForTeam(sConstructorId);
   const teamColor = { borderRight: `2px solid var(--color-${sConstructorId})` };
   const teamColorSlim = { borderBottom: `1px solid var(--color-${sConstructorId})` };
   const { t } = useTranslation();
   const oTeamInfo = [{ title: t("name"), value: oConstructor.name },
   { title: t("position"), value: constructor.position },
   { title: t("points"), value: constructor.points },
   { title: t("wins"), value: constructor.wins }]

   return (
      <div className="full-container">
         <i className="fa-solid fa-arrow-left" onClick={() => navigate(-1)}></i>
         <div className="detail-team-card">
            <div className="card-detail-left" style={teamColor}>
               <div className="card-detail-header">
                  <img src={getTeamLogoURL(sConstructorId)} alt="" />
               </div>
               {oTeamInfo.map((data) => {
                  return (
                     <div className="card-detail-line" style={teamColorSlim} key={data.title}>
                        <div className="card-title">{data.title}</div>
                        <div className="card-value">{data.value}</div>
                     </div>
                  )
               })}
            </div>
            <div className="card-detail-right">
               {arrDrivers.map((driver) => {
                  return (
                     <div className="card-detail-driver" key={driver.position}>
                        <img src={getDriverBGImageURL(driver.Driver)} alt={driver.familyName} />
                     </div>
                  )
               })}
            </div>
         </div>
      </div>
   )
}
export default DetailTeam