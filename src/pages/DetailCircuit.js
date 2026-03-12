import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatLapTime, getCircuitDetailDate, getCircuitDetailName } from "../utilities/UsefullUtils";
import '../styles/DetailSession.css';
import ButtonBack from "../components/components/ButtonBack";
import { useRaceList } from "../context/RaceContext";
import { driverNumberData } from "../assets/defaultMapping";

function DetailCircuit() {
   const { t } = useTranslation();
   const { state } = useLocation();
   const { nMeetingKey, nDefaultSessionKey, oRaceData } = state || {};
   const { arrSessions } = useRaceList();
   const arrWeekendSessions = arrSessions.filter((oSession) => oSession.meeting_key === nMeetingKey);
   const [nSelectedSessionKey, setSelectedSessionKey] = useState(nDefaultSessionKey);   
   const [arrSortedDriver, setSortedDriver] = useState([]);
   const [bLoading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchAllData() {
         try {
            if (!nSelectedSessionKey) return;
            setLoading(true);

            /* get drivers from session */
            const resultRes = await fetch(`https://api.openf1.org/v1/session_result?session_key=${nSelectedSessionKey}`);
            const arrDriver = await resultRes.json();
            setSortedDriver(arrDriver);
            setLoading(false);
         } catch (e) {
            console.error(e);
         }
      }
      fetchAllData();
   }, [nSelectedSessionKey]);

   function DriverRow({ driver, index }) {
      let oDriver = driverNumberData[driver.driver_number] || {};
      let constructorId = oDriver.constructorId;
      let sDetail = getDriverRowDetail(driver);

      return (
         <tr className={constructorId} key={driver.driver_number}>
            <td>{index}</td>
            <td>{oDriver.firstName.substring(0, 1)}. {oDriver.lastName}</td>
            <td>{sDetail}</td>
         </tr>
      )
   }

   function getDriverRowDetail(driver) {
      if (driver.dnf) return t('dnf');
      if (driver.dns) return t('dns');
      if (driver.dsq) return t('dsq');
      if (driver.position == 1) return formatLapTime(typeof driver.duration === "object" ? driver.duration[2] : driver.duration);
      if (driver.gap_to_leader && typeof driver.gap_to_leader == "object") {
         const arrDuration = driver.gap_to_leader;
         const sDuration = arrDuration[2] ?? arrDuration[1] ?? arrDuration[0];
         return "+ " + sDuration;
      } else if (typeof driver.gap_to_leader == "string") {
         return driver.gap_to_leader;
      } else {
         return "+ " + driver.gap_to_leader;
      }
   }

   return (
      <div className="container wide">
         <div className='detail-header'>
            <ButtonBack />
            <h1>{getCircuitDetailName(oRaceData)}<br/> {t("race")}</h1>
         </div>

         <div className="dropdown">
            <select value={nSelectedSessionKey} onChange={(e) => setSelectedSessionKey(parseInt(e.target.value))}>
               {arrWeekendSessions.map((oSession) => (
                  <option key={oSession.session_key} value={oSession.session_key}>{t(oSession.session_name.toLowerCase().replace(" ", "_"))} - {new Date(oSession.date_start).toLocaleString('de-DE', { month: 'short', day: 'numeric' })} {new Date(oSession.date_start).toLocaleString('de-DE', { hour: '2-digit', minute: '2-digit' })} </option>
               ))}
            </select>
         </div>
         <div className="list-container">
            <table className="table-session-standing">
               <tbody>
                  {bLoading ? (
                     <tr><td colSpan={3}>{t('loading')}</td></tr>
                  ) : arrSortedDriver.length > 0 ? (
                     arrSortedDriver.map((driver, index) => (
                        <DriverRow key={driver.driver_number} driver={driver} index={index + 1} />
                     ))
                  ) : (
                     <tr><td colSpan={3} style={{ color: '#fff' }}>{t('no_data')}</td></tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   )
}

export default DetailCircuit;