import DriverTable from "../blocks/DriverTable";
import MainCountdown from "../blocks/MainCountdown";
import NextRaceInfo from "../blocks/NextRaceInfo";
import { useTranslation } from 'react-i18next';

function Home({oNextRace,dNextRaceDate}) {
   const { t } = useTranslation();
   const oGrandPrix = {date: oNextRace.date,time: oNextRace.time}
   
   if (!dNextRaceDate) return <div></div>;
      
   return (
      <div className="container">
         <div className="data-container">
            <h1>{t('next_race')} <br/>{oNextRace.raceName}</h1>
            {oNextRace && <MainCountdown dNextRaceDate={dNextRaceDate} />}
            <NextRaceInfo oNextRace={oNextRace} oGrandPrix={oGrandPrix} />
         </div>
         <div className="list-container"><DriverTable/></div>
      </div>
  )
}

export default Home;