import React from "react";
import DriverTable from "../blocks/DriverTable";
import MainCountdown from "../blocks/MainCountdown";
import NextRaceInfo from "../blocks/NextRaceInfo";
import { useTranslation } from 'react-i18next';

function Home({nextRace,nextRaceDate}) {
   const { t } = useTranslation();
   const oGrandPrix = {date: nextRace.date,time: nextRace.time}

   return (
      <div className="container">
         <div className="data-container">
            <h1>{t('next_race')} <br/>{nextRace.raceName}</h1>
            {nextRaceDate && <MainCountdown nextRaceDate={nextRaceDate} />}
            <NextRaceInfo nextRace={nextRace} oGrandPrix={oGrandPrix} />
         </div>
         <div className="list-container">
            <DriverTable/>
         </div>
      </div>
  )
}

export default Home;