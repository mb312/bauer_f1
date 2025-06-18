import { useNavigate } from "react-router-dom";
import { getRaceSessions } from "../../utilities/raceUtils";

function NextRaceInfo({ oNextRace, oGrandPrix }) {
   const navigate = useNavigate(); 
   
   if (!oNextRace) return <div></div>;
 
   const arrSessions = getRaceSessions(oNextRace,oGrandPrix);   
   const handleClick = (session,index) => navigate(`/session/${session.date}`,{ state:{eventNo: index}});

   return (
      <div className="info-container">
         {arrSessions.map((session, index) => {
            let sClassName = (index % 2) ? "info-row-even" : "info-row-odd";
            if (session.isOver) sClassName += " event-over";
            return (
               <div className={sClassName} key={session.title}>
                  <div className="info-row-left">{session.title}</div>
                  <div className="info-row-right">{session.date}</div>
                  {session.isOver ? (
                     <div className="info-row-detail"  onClick={() => handleClick(session,index)}>
                        <i className="fa-solid fa-arrow-right"></i>
                     </div>
                  ) : (<div className="info-row-detail-empty"></div>)}
               </div>
            );
         })}
      </div>
   );
}

export default NextRaceInfo;