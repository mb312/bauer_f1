import React from "react";
import '../css/InfoContainer.css';

function NextRaceInfo({nextRace}) {
   const createDate = (oDate) => {
      if (typeof oDate !=="object") return "";
      const dDate = new Date(`${oDate.date}T${oDate.time}`);
      return dDate ? dDate.toLocaleString("de-AT") : "";
   }
   
   const oInfo = [{title: "1st Practise", date: createDate(nextRace.FirstPractice)},
                  {title: "2nd Practise", date: createDate(nextRace.SecondPractice)},
                  {title: "3rd Practise", date: createDate(nextRace.ThirdPractice)},
                  {title: "Qualifying", date: createDate(nextRace.Qualifying)}]

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

/* 
<p>
                  first practise: {sFirstPractise}<br/>
                  second practise: {sSecondPractise}<br/>
                  third practise: {sThirdPractise}<br/>
                  qualifying: {sQualifying}
               </p>
*/