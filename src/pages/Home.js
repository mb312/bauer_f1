import { useTranslation } from 'react-i18next';
import { useDriverStanding } from "../context/DriverStandingContext";
import DriverTable from "../components/blocks/DriverTable";
import NextRaceSection from "../components/blocks/NextRaceSection";
import useNextRace from '../hooks/UseNextRace';

function Home() {
   const { t } = useTranslation();
   const { arrDriverList } = useDriverStanding();  
   const { oNextRace, dNextRaceDate } = useNextRace();

   if (!oNextRace || !dNextRaceDate) return <div></div>;
   let bHasData = (Object.keys(arrDriverList).length>0);
   return (
      <div className="main-content">
         <NextRaceSection oNextRace={oNextRace} dNextRaceDate={dNextRaceDate} />
         <section className="next-spliter"></section>
         {bHasData && <DriverTable arrDriverList={arrDriverList} />}
      </div>
   )
}

export default Home;