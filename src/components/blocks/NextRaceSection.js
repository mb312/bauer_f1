import Countdown from "./Countdown";
import EventBlock from "./EventBlock";
import BroadCastBlock from "./BroadCastBlock";
import { useTranslation } from "react-i18next";
import { useRaceList } from "../../context/RaceContext";

function NextRaceSection() {
   const { t } = useTranslation();
   //const oGrandPrix = { date: oNextRace.date, time: oNextRace.time };
   const { arrSessions, arrRaces } = useRaceList();
   const oNextRace = arrRaces.find((race) => {return new Date(race.date_end).getTime() >= new Date().getTime()});
   
   if (!oNextRace) return <div></div>;
   const arrNextRace = (arrSessions.length >0) ? arrSessions.filter((session) => session.meeting_key === oNextRace?.meeting_key) : [];
   if (arrNextRace && arrNextRace.length === 0) return <div></div>;

//<BroadCastBlock round={oNextRace.round} />
   return (
      <section className="next-container">
         <div className="next-info">
            <h1>{t("next_race")}</h1>
            <h1>{oNextRace?.circuit_short_name}</h1>
            <div className="timer-container">
               <Countdown dToDate={new Date(oNextRace?.date_start)} />
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