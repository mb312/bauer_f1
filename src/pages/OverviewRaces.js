import React, { useRef } from "react";
import Card from '../components/components/Card';
import oRaces from '../assets/data/races.json';
import ButtonBackToTop from "../components/components/ButtonBackToTop";
import ButtonJumpTo from "../components/components/ButtonJumpTo";

function OverviewRaces() {
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
      <div className="card-list-col-auto-wide">
         {arrRaces.map((data) => {
            return <Card type="race" data={data} cardClass={3} key={data.round} />
         })}
         <ButtonJumpTo scrollToNextRace={scrollToNextRace} />
         <ButtonBackToTop />
      </div>
   )
}
export default OverviewRaces