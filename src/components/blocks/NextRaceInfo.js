import React from "react";
import { getIsEventOver, getLocalStringDate } from "../../utilities/usefullUtils";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

function NextRaceInfo({ nextRace, oGrandPrix }) {
   if (!nextRace) return null;
   const navigate = useNavigate(); 
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
   
   const handleClick = (session,index) => {
      navigate(`/session/${session.date}`,{ state:{eventNo: index}});
   };
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