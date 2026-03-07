import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatLapTime, getDateFormation, getDriverRaceResultPoints, getLastPositionOfDriver, getReorderByLastPosition, getSessionFilter, getStartingPostionOfDriver } from "../utilities/UsefullUtils";
import { getConstrocturIdWithDriverNo } from "../utilities/ConstructorUtils";
import '../styles/DetailSession.css';
import SessionButtons from "../components/blocks/SessionButtons";
import ButtonBack from "../components/components/ButtonBack";

const URL_SESSION = "https://api.openf1.org/v1/sessions?year=2026&";
const URL_DRIVERS = "https://api.openf1.org/v1/drivers?meeting_key=";
//const URL_LAPS = "https://api.openf1.org/v1/laps?meeting_key=";
//const URL_POSITIONS = "https://api.openf1.org/v1/position?session_key=";

function DetailCircuit() {
   const { t } = useTranslation();
   const { state } = useLocation();
   const { nRound, nSelctedEvent, oWeekend } = state || {};
   const [arrSessions, setSessions] = useState([]);
   const [oSelectedSession, setSelectedSession] = useState();
   const [arrSortedDriver, setSortedDriver] = useState([]);
   //const [aaDriversBySession, setDriversBySession] = useState({});
   //const [aaLapsBySession, setLapsBySession] = useState({});
   //const [aaRacePositions, setRacePosition] = useState([])
   const [bLoading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchAllData() {
         try {
            setLoading(true);
            /* this gets all sessions from the weekend */
            const sSessionUrl = getSessionFilter(oWeekend);
            const arrSessionJson = await fetch("https://api.openf1.org/v1/sessions?year=2026&date_start>=2026-03-6&date_end<=2026-03-9");
            const arrSessionResult = await arrSessionJson.json();
            setSessions(arrSessionResult);

            if (arrSessionResult.length > 0) {
               /* set selected session quali, race, practise,... - default practise1 */
               const oSelected = arrSessionResult[nSelctedEvent];
               setSelectedSession(oSelected);

               /* get session key */
               const nSessionKey = oSelected.session_key;
               /*console.log(nSessionKey)*/

               /* get drivers from session */
               const resultRes = await fetch(`https://api.openf1.org/v1/session_result?session_key=${nSessionKey}`);
               const arrDriver = await resultRes.json();
               setSortedDriver(arrDriver);
               setLoading(false);
            }
         } catch (e) {
            console.error(e);
         }
      }
      fetchAllData();
   }, []);

   // filter drivers for the selected session
   /*const drivers = useMemo(() => {
      if (!oSelectedSession || !oSelectedSession.session_key || !aaDriversBySession) return [];
      return aaDriversBySession[oSelectedSession.session_key];
   }, [aaDriversBySession, oSelectedSession]);*/

   // filter laps for the selected session
   /*const laps = useMemo(() => {
      if (!oSelectedSession || !oSelectedSession.session_key || !aaLapsBySession) return [];
      return aaLapsBySession[oSelectedSession.session_key];
   }, [aaLapsBySession, oSelectedSession]);*/

   // return fastest lap by driver
   /*const fastestLapByDriver = useMemo(() => {
      const map = {};
      if (!oSelectedSession || !oSelectedSession.session_key || !laps) return map;
      laps.forEach(lap => {
         const num = lap.driver_number;
         if (lap.lap_duration && (!map[num] || lap.lap_duration < map[num].lap_duration)) {
            map[num] = lap;
         }
      });
      return map;
   }, [laps]);*/

   // sorted drivers by fastest lap
   /*const sortedDrivers = useMemo(() => {
      if (!oSelectedSession || !oSelectedSession.session_key || !drivers) return [];

      if (oSelectedSession.session_type !== "Race") {
         return [...drivers].sort((a, b) => {
            const lapA = fastestLapByDriver[a.driver_number];
            const lapB = fastestLapByDriver[b.driver_number];
            if (!lapA && !lapB) return 0;
            if (!lapA) return 1;
            if (!lapB) return -1;
            return lapA.lap_duration - lapB.lap_duration;
         });
      }
      const nUse = (oSelectedSession.session_name === "Sprint") ? 1 : 0;

      return getReorderByLastPosition(drivers, aaRacePositions[nUse].result);
   }, [drivers, fastestLapByDriver]);*/

   function DriverRow({ driver, index }) {
      const fastestLap = driver.fastestlap;
      const constructorId = getConstrocturIdWithDriverNo(driver);
      let oStartPosition;
      let sClass = "";
      if (oSelectedSession.session_type === "Race") {
         const nUse = (oSelectedSession.session_name === "Sprint") ? 1 : 0;
         oStartPosition = aaRacePositions[nUse].start.find((number) => number.driver_number === driver.driver_number)
         sClass = (index < oStartPosition.position) ? "fa-solid fa-caret-up": (index >> oStartPosition.position) ? "fa-solid fa-caret-down" : "fa-solid fa-minus"
      }

      return (
         <tr className={constructorId} key={driver.driver_number}>
            <td>{index}</td>
            <td>{driver.last_name}</td>
            {oSelectedSession.session_type === "Race" ? (
               <td>
                  {getDriverRaceResultPoints(index, oSelectedSession.session_name)}
                  <i className={sClass}></i>
               </td>
            ) : (
               <td>{fastestLap?.lap_duration ? formatLapTime(fastestLap.lap_duration) : "-"}</td>
            )}
         </tr>
      )
   }

   return (
      <div className="container wide">
         <div className="data-container">
            <div className="header-go-back"><ButtonBack /></div>
         </div>
         {oSelectedSession ? (
            <div className="selected-session">
               <h1>{oSelectedSession.session_name}</h1>
               <div className="session-info">
                  <div className="info-left">{oSelectedSession.location}, {oSelectedSession.country_name}</div>
                  <div className="info-right">{getDateFormation(oSelectedSession.date_start, true)}</div>
               </div>
            </div>
         ) : (
            <h1>{t('loading')}</h1>
         )}
         {arrSessions.length > 0 && (
            <SessionButtons arrSessions={arrSessions}
               oSelectedSession={oSelectedSession}
               onSelect={setSelectedSession} />
         )}
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
                     <tr><td colSpan={3}>{t('no_data')}</td></tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   )
}

export default DetailCircuit;