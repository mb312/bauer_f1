import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import OverviewDrivers from './pages/OverviewDriver';
import OverviewTeams from './pages/OverviewTeams';
import OverviewRaces from './pages/OverviewRaces';
import DetailTeam from './pages/DetailTeam';
import DetailCircuit from './pages/DetailCircuit';
import DetailView from './pages/DetailView';
import ContactMe from './pages/ContactMe';
import LegalNotice from './pages/LegalNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './styles/General.css';
import './styles/Main.css';

export default function AppRoutes() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/overviewDrivers' element={<OverviewDrivers />} />
        <Route path='/overviewTeams' element={<OverviewTeams />} />
        <Route path='/overviewRaces' element={<OverviewRaces />} />
        <Route path='/contactMe' element={<ContactMe />} />
        <Route path='/driver/:driverId' element={<DetailView />} />
        <Route path='/team/:constructorId' element={<DetailTeam />} />
        <Route path='/circuit/:date' element={<DetailCircuit />} />
        <Route path='/legalNotice' element={<LegalNotice />} />
        <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
  );
}