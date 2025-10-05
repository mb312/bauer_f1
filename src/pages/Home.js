import { useTranslation } from 'react-i18next';
import { useDriverStanding } from "../context/DriverStandingContext";
import DriverTable from "../components/blocks/DriverTable";
import NextRaceSection from "../components/blocks/NextRaceSection";

function Home({ oNextRace, dNextRaceDate }) {
   const { t } = useTranslation();
   const { arrDriverList } = useDriverStanding();

   if (!oNextRace || !dNextRaceDate) return <div></div>;

   return (
      <div className="main-content">
         <NextRaceSection oNextRace={oNextRace} dNextRaceDate={dNextRaceDate} />
         <section className="next-spliter"></section>
         <DriverTable arrDriverList={arrDriverList} />
      </div>
   )
}

export default Home;