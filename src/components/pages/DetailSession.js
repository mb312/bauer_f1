import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatLapTime, getDateFormation, getDriverRaceResultPoints, getLastPositionOfDriver, getReorderByLastPosition, getStartingPostionOfDriver } from "../../utilities/usefullUtils";
import { getConstrocturIdWithDriverNo } from "../../utilities/constructorUtils";
import '../css/DetailSession.css';
import SessionButtons from "../components/SessionButtons";

const URL_SESSION = "https://api.openf1.org/v1/sessions?year=2025&meeting_key=latest";
const URL_DRIVERS = "https://api.openf1.org/v1/drivers?meeting_key=";
const URL_LAPS = "https://api.openf1.org/v1/laps?meeting_key=";
const URL_POSITIONS = "https://api.openf1.org/v1/position?session_key=";

function DetailSession() {
   const navigate = useNavigate();
   const { t } = useTranslation();
   const { state } = useLocation();
   const { eventNo } = state || {};
   const [sessions, setSessions] = useState([]);
   const [selectedSession, setSelectedSession] = useState();
   const [driversBySession, setDriversBySession] = useState({});
   const [lapsBySession, setLapsBySession] = useState({});
   const [racePositions, setRacePosition] = useState({})
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchAllData() {
         setLoading(true);
         // step 1: Fetch sessions
         const sessionsRes = await fetch(URL_SESSION);
         const arrSessions = await sessionsRes.json();
         setSessions(arrSessions);
               
         if (arrSessions.length === 0) {
            setLoading(false);
            return;
         }
         const nSelected = (eventNo);
         setSelectedSession(arrSessions[nSelected]);
         
         const meetingKey = arrSessions[nSelected].meeting_key;
         const raceKey = arrSessions[arrSessions.length-1].session_key;

         Promise.all([fetch(URL_DRIVERS + meetingKey).then(res => res.json()),
                     fetch(URL_LAPS + meetingKey).then(res => res.json()),
                     fetch(URL_POSITIONS+raceKey).then(res => res.json())
         ]).then(([drivers, laps, positions]) => {
            const groupedDrivers = {};
            const groupedLaps = {};

            arrSessions.map((session) =>{
               const nSessionKey = session.session_key;
               groupedDrivers[nSessionKey] = drivers.filter(driver => driver.session_key === nSessionKey);
               groupedLaps[nSessionKey] = laps.filter(lap => lap.session_key === nSessionKey);
            })
            setDriversBySession(groupedDrivers);
            setLapsBySession(groupedLaps);

            setRacePosition({result: getLastPositionOfDriver(positions), start: getStartingPostionOfDriver(positions)});
            setLoading(false);
         });
      }
      fetchAllData();
   }, []);
      
   // filter drivers for the selected session
   const drivers = useMemo(() => {
      if (!selectedSession || !selectedSession.session_key || !driversBySession) return [];
      return driversBySession[selectedSession.session_key];
   }, [driversBySession, selectedSession]);

   // filter laps for the selected session
   const laps = useMemo(() => {
      if (!selectedSession || !selectedSession.session_key || !lapsBySession) return [];
      return lapsBySession[selectedSession.session_key];
   }, [lapsBySession, selectedSession]);

   // return fastest lap by driver
   const fastestLapByDriver = useMemo(() => {
      const map = {};
      if (!selectedSession || !selectedSession.session_key || !laps) return map;
      laps.forEach(lap => {
         const num = lap.driver_number;
         if (lap.lap_duration && (!map[num] || lap.lap_duration < map[num].lap_duration)) {
            map[num] = lap;
         }
      });
      return map;
   }, [laps]);

   // sorted drivers by fastest lap
   const sortedDrivers = useMemo(() => {
      if (!selectedSession || !selectedSession.session_key || !drivers) return [];
      if (selectedSession.session_type !== "Race"){
         return [...drivers].sort((a, b) => {
            const lapA = fastestLapByDriver[a.driver_number];
            const lapB = fastestLapByDriver[b.driver_number];
            if (!lapA && !lapB) return 0;
            if (!lapA) return 1;
            if (!lapB) return -1;
            return lapA.lap_duration - lapB.lap_duration;
         });
      }
      return getReorderByLastPosition(drivers, racePositions.result);
   }, [drivers, fastestLapByDriver]);

   function DriverRow({ driver, index }) {
      const fastestLap = fastestLapByDriver[driver.driver_number];
      const constructorId = getConstrocturIdWithDriverNo(driver.driver_number);
      let oStartPosition;;
      let sClass = "";
      if (selectedSession.session_type === "Race"){
         oStartPosition = racePositions.start.find((number) => number.driver_number === driver.driver_number)
         sClass = (index<oStartPosition.position) ? "fa-solid fa-caret-up"
                  : (index>>oStartPosition.position) ? "fa-solid fa-caret-down"
                  : "fa-solid fa-minus"
      }

      return (
         <tr className={constructorId} key={driver.driver_number}>
            <td>{index}</td>
            <td>{driver.last_name}</td>
            {selectedSession.session_type === "Race" ? (
               <td>
                  {getDriverRaceResultPoints(index)}
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
            <div className="header-go-back">
               <i className="fa-solid fa-arrow-left" onClick={() => navigate(-1)}></i>
            </div>
            {selectedSession ? (
               <div className="selected-session">
                  <h1>{selectedSession.session_name}</h1>
                  <div className="session-info">
                     <div className="info-left">{selectedSession.location}, {selectedSession.country_name}</div>
                     <div className="info-right">{getDateFormation(selectedSession.date_start, true)}</div>
                  </div>
               </div>
            ) : (
               <h1>{t('loading')}</h1>
            )}
            {sessions.length > 0 && (
               <SessionButtons sessions={sessions}
                              selectedSession={selectedSession}
                              onSelect={setSelectedSession}/>
            )}
         </div>
         <div className="list-container">
            <table className="table-session-standing">
               <tbody>
                  {loading ? (
                     <tr><td colSpan={3}>{t('loading')}</td></tr>
                  ) : sortedDrivers.length > 0 ? (
                     sortedDrivers.map((driver, index) => (
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

export default DetailSession