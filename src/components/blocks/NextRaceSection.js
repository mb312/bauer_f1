import Countdown from "./Countdown";
import EventBlock from "./EventBlock";
import { getRaceSessions } from "../../utilities/RaceUtils";
import { useTranslation } from "react-i18next";

function NextRaceSection({ oNextRace, dNextRaceDate }) {
   const { t } = useTranslation();
   const oGrandPrix = { date: oNextRace.date, time: oNextRace.time };
   const arrNextRace = getRaceSessions(oNextRace, oGrandPrix);
   
   return (
      <section className="next-container">
         <div className="next-info">
            <h1>{t("next_race")}</h1>
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