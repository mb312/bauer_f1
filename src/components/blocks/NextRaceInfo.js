import React from "react";
import { getIsEventOver, getLocalStringDate } from "../../utilities/usefullUtils";
import { useTranslation } from 'react-i18next';

function NextRaceInfo({nextRace,oGrandPrix}) {   
   const { t } = useTranslation();
   const arrSessions = [{title: t('first_practice'), date: getLocalStringDate(nextRace.FirstPractice), isOver: getIsEventOver(nextRace.FirstPractice)},
                  {title: t('qualifying'), date: getLocalStringDate(nextRace.Qualifying), isOver: getIsEventOver(nextRace.Qualifying)},
                  {title: t('grand_prix'), date: getLocalStringDate(oGrandPrix), isOver: getIsEventOver(oGrandPrix)}]

   if (nextRace.Sprint) {
      arrSessions.push({title: t('sprint_qualifying'), date: getLocalStringDate(nextRace.SprintQualifying), isOver: getIsEventOver(nextRace.SprintQualifying)});
      arrSessions.push({title: t('sprint'), date: getLocalStringDate(nextRace.Sprint), isOver: getIsEventOver(nextRace.Sprint)});
   }else{
      arrSessions.push({title: t('second_practice'), date: getLocalStringDate(nextRace.SecondPractice), isOver: getIsEventOver(nextRace.SecondPractice)});
      arrSessions.push({title: t('third_practice'), date: getLocalStringDate(nextRace.ThirdPractice), isOver: getIsEventOver(nextRace.ThirdPractice)});
   }

   arrSessions.sort((a,b) => a.date>b.date);
   return (
      <div className="info-container">
         {arrSessions.map((oCurrent,index) => {
            let sClassName = (index%2) ? "info-row-even" : "info-row-odd";
            if (oCurrent.isOver) sClassName+=" event-over";
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