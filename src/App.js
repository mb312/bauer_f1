import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import './i18n';
import './components/css/Main.css';
import './components/css/General.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { TeamStandingProvider } from './context/TeamStandingContext';
import { DriverStandingProvider } from './context/DriverStandingContext';
import Home from './components/pages/Home';
import OverviewDriver from './components/pages/OverviewDriver';
import OverviewTeams from './components/pages/OverviewTeams';
import OverviewRaces from './components/pages/OverviewRaces';
import DetailDriver from './components/pages/DetailDriver';
import DetailTeam from './components/pages/DetailTeam';
import DetailSession from './components/pages/DetailWeekend';
import ContactMe from './components/pages/ContactMe';

const URL_RACES = 'https://api.jolpi.ca/ergast/f1/2025/races/';

function App() {
   const [oNextRace, setNextRace] = useState([]);
   const [dNextRaceDate, setNextRaceTime] = useState(null);
   const [oRaceList, setRaceList] = useState(null);

   const fetchAllRaces = async() => {
      try{
         const oResponseJson = await fetch(URL_RACES);
         const arrData = await oResponseJson.json();
         const arrRaces = arrData.MRData.RaceTable.Races;
         setRaceList(arrRaces);         
         
         const dToday = new Date();
         const oRace = arrRaces.find((race) => {
            const tTime = race.time.endsWith('Z') ? race.time.slice(0, -1) : race.time;
            return new Date(`${race.date}T${tTime}Z`).getTime()>=dToday.getTime();
         })
         setNextRace(oRace);
         
         if (oRace && oRace.date && oRace.time) {
            const tTime = oRace.time.endsWith('Z') ? oRace.time.slice(0, -1) : oRace.time;
            const dDate = `${oRace.date}T${tTime}Z`;
            setNextRaceTime(new Date(dDate));
         }
      }catch(error){
         console.error("Error fetching next race:",error);
      }
   }
   
   useEffect(() => {
      fetchAllRaces();
   },[])

   return (
      <>
         <Router>
            <Header />
            <DriverStandingProvider>
            <TeamStandingProvider>
            <Routes>
               <Route path='/' element={<Home oNextRace={oNextRace} dNextRaceDate={dNextRaceDate} />} />
               <Route path='/overviewDriver' element={<OverviewDriver />} />
               <Route path='/overviewTeams' element={<OverviewTeams />} />
               <Route path='/overviewRaces' element={<OverviewRaces arrRaceList={oRaceList} oNextRace={oNextRace} />} />
               <Route path='/contactMe' element={<ContactMe />} />
               <Route path='/driver/:driverId' element={<DetailDriver />} />
               <Route path='/team/:constructorId' element={<DetailTeam />} />
               <Route path='/session/:date' element={<DetailSession />} />
            </Routes>
            </TeamStandingProvider>
            </DriverStandingProvider>
            <Footer />
         </Router>
      </>
   );
}

export default App;