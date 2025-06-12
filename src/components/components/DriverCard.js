import React from "react";
import { getTeamLogoURL } from "../../utilities/constructorUtils";
import { getDriverImageURL, getDrivernumber } from "../../utilities/driverUtils";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const DriverCard = (props) => { 
   const navigate = useNavigate();
   const oDriver = props.Driver;
   const oConstructor = props.Constructors[0];
   const sDriverName = oDriver.givenName+" "+oDriver.familyName;
   const teamColor = { color: `var(--color-${oConstructor.constructorId})` };

   const handleClick = () => {
      navigate(`/driver/${oDriver.driverId}`,{ state:{driver:oDriver,constructor:oConstructor,position:props.position,points:props.points}});
   };
   
   return (
      <div className="card" onClick={handleClick} style={{cursor:"pointer"}}>
         <div className="card-standing">
            <div className="standing-left">{props.position}</div>
            <div className="standing-right">{props.points} PTS</div>
         </div>
         <div className="card-info">
            <div className="info-name">{sDriverName}</div>
            <div className="info-img">
               <img src={getTeamLogoURL(oConstructor.constructorId)} alt={`${oConstructor.name} logo`} loading="lazy" />
            </div>
         </div>
         <div className="card-end-split">
            <div className="end-number" style={teamColor} >
               {getDrivernumber(oDriver)}
            </div>
            <div className="end-img">
               <img src={getDriverImageURL(oDriver)} alt={`${sDriverName} portrait`} loading="lazy" />
            </div>
         </div>
      </div>
   )
}

DriverCard.propTypes = {
   Driver: PropTypes.object.isRequired,
   Constructors: PropTypes.array.isRequired,
   position: PropTypes.string.isRequired,
   points: PropTypes.string.isRequired
}

export default DriverCard;