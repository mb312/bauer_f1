import React from "react";
import { getMiniTeamLogoURL, getTeamCarURL } from "../../utilities/constructorUtils";
import { useNavigate } from "react-router-dom";

const TeamCard = (props) => { 
   const navigate = useNavigate();
   const oConstructor = props.Constructor;
   const sConstructorId = oConstructor.constructorId;
   const handleClick = () => {
      navigate(`/team/${oConstructor.constructorId}`,{ state:{constructor:props,position:props.position,points:props.points}});
   };

   return (
      <div className="card" onClick={handleClick}>
         <div className="card-standing">
             <div className="standing-left">{props.position}</div>
            <div className="standing-right">{props.points} PTS</div>
         </div>
         <div className="card-info">
            <div className="info-name">{oConstructor.name}</div>
            <div className="info-img">
               <img src={getMiniTeamLogoURL(sConstructorId)} alt={`${oConstructor.name} logo`} />
            </div>
         </div>
         <div className="card-end-img">
            <img src={getTeamCarURL(sConstructorId)} alt={`${oConstructor.name} car`} />
         </div>
      </div>
   )
}

export default TeamCard;