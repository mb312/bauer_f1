import React, { useEffect, useRef, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import './components/css/Main.css';
import './components/css/General.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import OverviewDriver from './components/pages/OverviewDriver';
import OverviewTeams from './components/pages/OverviewTeams';
import OverviewRaces from './components/pages/OverviewRaces';
import { TeamStandingProvider } from './context/TeamStandingContext';

const URL_DRIVERSTANDING = 'https://api.jolpi.ca/ergast/f1/2025/driverstandings/';
const URL_RACES = 'https://api.jolpi.ca/ergast/f1/2025/races/';

function App() {
   const [driverList, setDriverList] = useState([]);
   const [nextRace, setNextRace] = useState([]);
   const [nextRaceDate, setNextRaceTime] = useState(null);
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

   const fetchNextRace = async() => {
      try{
         const response = await fetch(URL_RACES);
         const data = await response.json();
         const today = new Date();
         const arrRaces = data.MRData.RaceTable.Races;
         const oNext = arrRaces.find((race) => new Date(race.date).getTime()>=today.getTime());
            
         setNextRace(oNext);

         if (oNext && oNext.date && oNext.time) {
            const time = oNext.time.endsWith('Z') ? oNext.time.slice(0, -1) : oNext.time;
            const dDate = `${oNext.date}T${time}Z`;
            setNextRaceTime(new Date(dDate));
         }
      }catch(error){
         console.error("Error fetching next race:",error);
      }
   }

   useEffect(() => {
      fetchDriverStandingData();
      fetchNextRace();
      firstRender.current = false;
   },[]);

   return (
      <>
         <Router>
            <Header />
            <TeamStandingProvider>
            <Routes>
               <Route path='/' element={<Home driverList={driverList} nextRace={nextRace} nextRaceDate={nextRaceDate} />} />
               <Route path="/overviewDriver" element={<OverviewDriver driverList={driverList} />} />
                  <Route path='/overviewTeams' element={<OverviewTeams />} />
               <Route path='/overviewRaces' element={<OverviewRaces />} />
            </Routes>
            </TeamStandingProvider>
            <Footer />
         </Router>
      </>
   );
}

export default App;