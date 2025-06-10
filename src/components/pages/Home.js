import React from "react";
import DriverTable from "../blocks/DriverTable";
import MainCountdown from "../blocks/MainCountdown";
import NextRaceInfo from "../blocks/NextRaceInfo";

function Home({driverList,nextRace,nextRaceDate}) {
   return (
      <div className="container">
         <div className="data-container">
            <h1>Next race: <br/>{nextRace.raceName}</h1>
            {nextRaceDate && <MainCountdown nextRaceDate={nextRaceDate} />}
            <NextRaceInfo nextRace={nextRace} />
         </div>
         <div className="list-container">
            <DriverTable driverList={driverList} />
         </div>
      </div>
  )
}

export default Home;