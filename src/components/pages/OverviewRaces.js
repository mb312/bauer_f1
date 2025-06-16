import React, { useEffect, useRef, useState } from "react";
import CircuitCard from "../components/CircuitCard";
import BackToTopButton from "../components/BackToTopButton";
import { getRaceActive } from "../../utilities/usefullUtils";
import JumpToButton from "../components/JumpToButton";

function OverviewRaces({ arrRaceList }) {
   if (!arrRaceList) return <div>Loading...</div>;
   const cardRefs = useRef([]);
   
   const scrollToNextRace = () => {
      console.log(arrRaceList);
      const currentRaceIndex = arrRaceList.findIndex((data) => new Date(data.date)>=new Date());
      console.log(currentRaceIndex);
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
         <JumpToButton scrollToNextRace={scrollToNextRace} />
         <BackToTopButton />
      </div>
   )
}
export default OverviewRaces