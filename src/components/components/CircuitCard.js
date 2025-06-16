import React from "react";
import { getIsEventOver, getLocalStringDate } from "../../utilities/usefullUtils";
import { getTrackFlagImg, getTrackImg } from "../../utilities/raceUtils";

const CircuitCard = (props) => {
   const oDate = {date: props.date,time:props.time};
   const dDate = getLocalStringDate(oDate);
   const bOver = getIsEventOver(oDate);
   let sAddClass = "";
   
   if (bOver) sAddClass += " outdated";
   if (props.bCurrent) sAddClass += " currently";
   
   return (
      <div className="card" ref={props.forwardRef}>
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
export default CircuitCard;