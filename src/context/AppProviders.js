import { YearProvider } from './YearContext';
import { TeamStandingProvider } from './TeamStandingContext';
import { DriverStandingProvider } from './DriverStandingContext';
import { RaceProvider } from './RaceContext';

export default function AppProviders({ children }) {
  return (
    <YearProvider>
      <TeamStandingProvider>
        <DriverStandingProvider>
          <RaceProvider>
          {children}
          </RaceProvider>
        </DriverStandingProvider>
      </TeamStandingProvider>
      </YearProvider>
  );
}