import React from "react";
import { getLocalStringDate } from "../../utilities/usefullUtils";

function NextRaceInfo({nextRace}) {   
   const oInfo = [{title: "1st Practise", date: getLocalStringDate(nextRace.FirstPractice)},
                  {title: "2nd Practise", date: getLocalStringDate(nextRace.SecondPractice)},
                  {title: "3rd Practise", date: getLocalStringDate(nextRace.ThirdPractice)},
                  {title: "Qualifying", date: getLocalStringDate(nextRace.Qualifying)}]

   return (
      <div className="info-container">
         {oInfo.map((oCurrent,index) => {
            const sClassName = (index%2) ? "info-row-even" : "info-row-odd";
            return(
               <div className={sClassName} key={index}>
                  <div className="info-row-left">{oCurrent.title}</div>
                  <div className="info-row-right">{oCurrent.date}</div>
               </div>
            )
         })}
      </div>
   )
}

export default NextRaceInfo