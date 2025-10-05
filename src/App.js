import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';
import useNextRace from './hooks/UseNextRace';
import AppProviders from './context/AppProviders';
import AppRoutes from './AppRoutes';

function App() {
   const { oNextRace, dNextRaceDate } = useNextRace();

   return (
      <Router>
         <PageHeader />
         <AppProviders>
            <AppRoutes oNextRace={oNextRace} dNextRaceDate={dNextRaceDate} />
         </AppProviders>
         <PageFooter />
      </Router>
   );
}

export default App;