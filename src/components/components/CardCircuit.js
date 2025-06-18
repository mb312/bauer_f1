import React from "react";
import { getIsEventOver, getLocalStringDate } from "../../utilities/usefullUtils";
import { getTrackFlagImg, getTrackImg } from "../../utilities/raceUtils";
import { useNavigate } from "react-router-dom";

const CardCircuit = (props) => {
   const navigate = useNavigate(); 
   const oDate = {date: props.date,time:props.time};
   const dDate = getLocalStringDate(oDate);
   const bFuture = (new Date(props.date) > new Date());
   const bOver = getIsEventOver(oDate);
   const oRace = {FirstPractice: props.FirstPractice, date: props.date};
   let sAddClass = "";
   
   if (bOver) sAddClass += " outdated";
   if (props.bCurrent) sAddClass += " currently";
   
   const handleClick = () => {
      if (bFuture) return;
      const oDate = getLocalStringDate(props.FirstPractice)
      navigate(`/session/${oDate}`,{ state:{eventNo: 0, oWeekend: oRace}});
   };

   return (
      <div className="card"
            ref={props.forwardRef}
            onClick={() => handleClick()}
            style={{cursor: (bFuture) ? 'default' : 'pointer'}}>
         <div className={`card-standing${sAddClass}`}>
            <div className="standing-left">{props.round}</div>
            <div className={`standing-right-long${sAddClass}`}>{dDate}</div>
         </div>
         <div className="card-info">
            <div className="info-name">{props.raceName}</div>
            <div className="info-img">
               <img className="flag-img" src={getTrackFlagImg(props)} alt={`${props.raceName} flag`} loading="lazy" />
            </div>
         </div>
         <div className="card-end-img">
            <img src={getTrackImg(props)} alt={`${props.raceName} track`} />
         </div>
      </div>
   )
}
export default CardCircuit;