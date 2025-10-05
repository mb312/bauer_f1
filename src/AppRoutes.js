import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OverviewDrivers from './pages/OverviewDriver';
import OverviewTeams from './pages/OverviewTeams';
import OverviewRaces from './pages/OverviewRaces';
import DetailDriver from './pages/DetailDriver';
import DetailTeam from './pages/DetailTeam';
import DetailCircuit from './pages/DetailCircuit';
import './styles/General.css';
import './styles/Main.css';

export default function AppRoutes({ oNextRace, dNextRaceDate }) {
  return (
    <Routes>
      <Route path='/' element={<Home oNextRace={oNextRace} dNextRaceDate={dNextRaceDate} />} />
      <Route path='/overviewDrivers' element={<OverviewDrivers />} />
      <Route path='/overviewTeams' element={<OverviewTeams />} />
      <Route path='/overviewRaces' element={<OverviewRaces />} />
      <Route path='/driver/:driverId' element={<DetailDriver />} />
      <Route path='/team/:constructorId' element={<DetailTeam />} />
      <Route path='/circuit/:date' element={<DetailCircuit />} />
    </Routes>
  );
}