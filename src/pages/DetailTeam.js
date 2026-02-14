import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getDriversForTeam, getTeamLogoURL } from "../utilities/ConstructorUtils";
import { getDriverBGImageURL } from "../utilities/DriverUtils";
import ButtonBack from '../components/components/ButtonBack';
import '../styles/DetailTeam.css';

function DetailTeam() {
   const { t } = useTranslation();
   const { state } = useLocation();
   const { constructor } = state || {};
   const oConstructor = constructor?.Constructor || constructor;
   const sConstructorId = oConstructor.constructorId;
   const arrDrivers = getDriversForTeam(sConstructorId);
   const oTeamColor = { borderRight: `2px solid var(--color-${sConstructorId})` };
   const oTeamColorSlim = { borderBottom: `1px solid var(--color-${sConstructorId})` };
   const oTeamInfo =[{title: t("name"), value: oConstructor.name},
                     {title: t("position"), value: constructor.position},
                     {title: t("points"), value: constructor.points},
                     {title: t("wins"), value: constructor.wins}]

   return (
      <div className="full-container">
         <ButtonBack />
         <div className="detail-team-card">
            <div className="card-detail-left" style={oTeamColor}>
               <div className="card-detail-header">
                  <img src={getTeamLogoURL(sConstructorId)} alt={`${oConstructor.name} logo`} />
               </div>
               {oTeamInfo.map((data) => {
                  return (
                     <div className="card-detail-line" style={oTeamColorSlim} key={data.title}>
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
                        <img src={getDriverBGImageURL(driver.Driver)} alt={`${driver.Driver.familyName} portrait`} />
                     </div>
                  )
               })}
            </div>
         </div>
      </div>
   )
}
export default DetailTeam