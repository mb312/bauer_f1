import { useEffect, useState } from 'react';
import oRaces from '../assets/data/races.json';

export default function useNextRace() {
   const [oNextRace, setNextRace] = useState([]);
   const [dNextRaceDate, setNextRaceTime] = useState(null);

   useEffect(() => {
      const getNextRaceData = () => {
         try {
            const arrRaces = oRaces.races;
            const dToday = new Date();
            const oRace = arrRaces.find((race) => {
               const tTime = race.time.endsWith('Z') ? race.time.slice(0, -1) : race.time;
               return new Date(`${race.date}T${tTime}Z`).getTime()>=dToday.getTime();
            });
            setNextRace(oRace);

            if (oRace && oRace.date && oRace.time) {
               const tTime = oRace.time.endsWith('Z') ? oRace.time.slice(0, -1) : oRace.time;
               const dDate = `${oRace.date}T${tTime}Z`;
               setNextRaceTime(new Date(dDate));
            }
         } catch (error) {
            console.error("Error fetching next race:", error);
         }
      };

      getNextRaceData();
   }, []);

   return { oNextRace, dNextRaceDate };
}