import { DriverStandingProvider } from './DriverStandingContext';
import { TeamStandingProvider } from './TeamStandingContext';

export default function AppProviders({ children }) {
  return (
    <TeamStandingProvider>
      <DriverStandingProvider>
        {children}
      </DriverStandingProvider>
    </TeamStandingProvider>
  );
}