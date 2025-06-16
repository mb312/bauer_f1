import React, { useEffect, useRef, useState } from "react";
import CircuitCard from "../components/CircuitCard";
import { getRaceActive } from "../../utilities/usefullUtils";
import ButtonBackToTop from "../components/ButtonBackToTop";
import ButtonJumpTo from "../components/ButtonJumpTo";

function OverviewRaces({ arrRaceList }) {
   if (!arrRaceList) return <div>Loading...</div>;
   const cardRefs = useRef([]);
   
   const scrollToNextRace = () => {
      const currentRaceIndex = arrRaceList.findIndex((data) => new Date(data.date)>=new Date());
      if (currentRaceIndex !== -1 && cardRefs.current[currentRaceIndex]) {
         cardRefs.current[currentRaceIndex].scrollIntoView({behavior: 'smooth',
                                                            block: 'start',});
      }
   };
   
   return (
      <div className="card-list-col-three">
         {arrRaceList.map((data, index) => {
            const bCurrent = getRaceActive(data);
            return <CircuitCard {...data} key={data.round} bCurrent={bCurrent} forwardRef={(el) => (cardRefs.current[index] = el)}/>
         })}
         <ButtonJumpTo scrollToNextRace={scrollToNextRace} />
         <ButtonBackToTop />
      </div>
   )
}
export default OverviewRaces