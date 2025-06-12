import React, { useEffect, useRef, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import './i18n';
import './components/css/Main.css';
import './components/css/General.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import OverviewDriver from './components/pages/OverviewDriver';
import OverviewTeams from './components/pages/OverviewTeams';
import OverviewRaces from './components/pages/OverviewRaces';
import { TeamStandingProvider } from './context/TeamStandingContext';
import DriverDetail from './components/pages/DriverDetail';

const URL_DRIVERSTANDING = 'https://api.jolpi.ca/ergast/f1/2025/driverstandings/';
const URL_RACES = 'https://api.jolpi.ca/ergast/f1/2025/races/';

function App() {
   const [arrDriverList, setDriverList] = useState([]);
   const [nextRace, setNextRace] = useState([]);
   const [nextRaceDate, setNextRaceTime] = useState(null);
   const [oRaceList, setRaceList] = useState(null);
   const firstRender = useRef(true);

   const fetchDriverStandingData = async () => {
      if (!firstRender.current) return;
      try{
         const response = await fetch(URL_DRIVERSTANDING);
         const data = await response.json();

         let oStanding = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
         setDriverList(oStanding);
      }catch(error){
         console.error("Error fetching driver standing:",error);
      }
   }

   const fetchAllRaces = async() => {
      if (!firstRender.current) return;
      try{
         const response = await fetch(URL_RACES);
         const data = await response.json();
         const arrRaces = data.MRData.RaceTable.Races;
         setRaceList(arrRaces);
         
         const today = new Date();
         const oRace = arrRaces.find((race) => new Date(race.date).getTime()>=today.getTime());
         setNextRace(oRace);
         
         if (oRace && oRace.date && oRace.time) {
            const time = oRace.time.endsWith('Z') ? oRace.time.slice(0, -1) : oRace.time;
            const dDate = `${oRace.date}T${time}Z`;
            setNextRaceTime(new Date(dDate));
         }
      }catch(error){
         console.error("Error fetching next race:",error);
      }
   }
   
   useEffect(() => {
      fetchDriverStandingData();
      fetchAllRaces();
      firstRender.current = false;
   })

   return (
      <>
         <Router>
            <Header />
            <TeamStandingProvider>
            <Routes>
               <Route path='/' element={<Home driverList={arrDriverList} nextRace={nextRace} nextRaceDate={nextRaceDate} />} />
               <Route path='/overviewDriver' element={<OverviewDriver driverList={arrDriverList} />} />
               <Route path='/overviewTeams' element={<OverviewTeams />} />
               <Route path='/overviewRaces' element={<OverviewRaces raceList={oRaceList}/>} />
               <Route path='/driver/:driverId' element={<DriverDetail />} />
            </Routes>
            </TeamStandingProvider>
            <Footer />
         </Router>
      </>
   );
}

export default App;