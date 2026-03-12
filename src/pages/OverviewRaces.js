import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import Card from '../components/components/Card';
import LoadingSpinner from "../components/components/LoadingSpinner";
import ButtonBackToTop from "../components/components/ButtonBackToTop";
import { useRaceList } from "../context/RaceContext";
import { useYearContext } from "../context/YearContext";
//import ButtonJumpTo from "../components/components/ButtonJumpTo";

function OverviewRaces() {
   const { t } = useTranslation();
   const cardRefs = useRef([]);
   const {year} = useYearContext();
   const {arrRaces, bLoading} = useRaceList();
   const scrollToNextRace = () => {
      const currentRaceIndex = arrRaces.findIndex((data) => new Date(data?.date) >= new Date());
      if (currentRaceIndex !== -1 && cardRefs.current[currentRaceIndex]) {
         cardRefs.current[currentRaceIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'start',
         });
      }
   };

   if (bLoading) {
      return <LoadingSpinner sMessage={t('loading') || 'Loading…'} />
   }

   return (
      <div className='overview-container'>
         <h1>{t('race_schedule')} {year}</h1>
         <div className="card-list-col-auto-large">
            {Array.isArray(arrRaces) && arrRaces.map((data,index) => {
               return <Card type="race" data={data} cardClass={3} key={index} position={index+1} />
            })}
            
         </div>
      </div>
   )
}
export default OverviewRaces