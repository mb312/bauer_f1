import Countdown from "./Countdown";
import EventBlock from "./EventBlock";
import { getRaceSessions } from "../../utilities/raceUtils";

function NextRaceSection({ oNextRace, dNextRaceDate }) {
   const oGrandPrix = { date: oNextRace.date, time: oNextRace.time };
   const arrNextRace = getRaceSessions(oNextRace, oGrandPrix);

   return (
      <section className="next-container">
         <div className="next-info">
            <h1>next race</h1>
            <h1>{oNextRace.raceName}</h1>
            <div className="timer-container">
               <Countdown dToDate={dNextRaceDate} />
            </div>
         </div>
         <div className="info-container">
            {arrNextRace.map((session, index) => (
               <EventBlock session={session} key={index} />
            ))}
         </div>
      </section>
   );
}

export default NextRaceSection;