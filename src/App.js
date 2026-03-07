import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import './i18n';
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';
import AppProviders from './context/AppProviders';
import AppRoutes from './AppRoutes';

function App() {
   return (
      <Router>         
         <PageHeader />
         <AppProviders>
            <AppRoutes/>
         </AppProviders>
         <PageFooter />
      </Router>
   );
}

export default App;