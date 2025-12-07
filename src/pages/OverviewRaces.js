import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import Card from '../components/components/Card';
import oRaces from '../assets/data/races.json';
import ButtonBackToTop from "../components/components/ButtonBackToTop";
import ButtonJumpTo from "../components/components/ButtonJumpTo";

function OverviewRaces() {
   const { t } = useTranslation();
   const cardRefs = useRef([]);
   const arrRaces = oRaces.races;
   
   const scrollToNextRace = () => {
      const currentRaceIndex = arrRaces.findIndex((data) => new Date(data.date)>=new Date());
      if (currentRaceIndex !== -1 && cardRefs.current[currentRaceIndex]) {
         cardRefs.current[currentRaceIndex].scrollIntoView({behavior: 'smooth',
                                                            block: 'start',});
      }
   };
   
   return (
      <div className='overview-container'>
         <h1>{t('race_schedule')}</h1>
         <div className="card-list-col-auto-wide">
            {arrRaces.map((data) => {
               if (data.round !=="0") return <Card type="race" data={data} cardClass={3} key={data.round} />
            })}            
            <ButtonBackToTop />
         </div>
      </div>
   )
}
export default OverviewRaces