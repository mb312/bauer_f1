import { useEffect, useState } from 'react';
import { useYearContext } from '../context/YearContext';
import oRaces from '../assets/data/races.json';

export default function useNextRace() {
   const [oNextRace, setNextRace] = useState([]);
   const [dNextRaceDate, setNextRaceTime] = useState(null);

   useEffect(() => {
      const loadData = async() =>{
         try{
            let nYear = new Date().getFullYear();
            const URL_RACES = `https://api.jolpi.ca/ergast/f1/${nYear}/races/`;
            let res = await fetch(URL_RACES);
            let data = await res.json();
            let arrRaces = data.MRData.RaceTable.Races;
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
         }catch(e){
            console.error(e)
         }
      }
      loadData();

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

      //getNextRaceData();
   }, []);

   return { oNextRace, dNextRaceDate };
}