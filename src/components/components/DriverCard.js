import React from "react";
import { getTeamLogoURL } from "../../utilities/constructorUtils";
import { getDriverImageURL, getDrivernumber } from "../../utilities/driverUtils";
import PropTypes from 'prop-types';

const DriverCard = (props) => { 
   const oDriver = props.Driver;
   const oConstructor = props.Constructors[0];
   const sDriverName = oDriver.givenName+" "+oDriver.familyName;
   const teamColor = { color: `var(--color-${oConstructor.constructorId})` };
   
   return (
      <div className="card">
         <div className="card-standing">
            <div className="standing-left">{props.position}</div>
            <div className="standing-right">{props.points} PTS</div>
         </div>
         <div className="card-info">
            <div className="info-name">{sDriverName}</div>
            <div className="info-img">
               <img src={getTeamLogoURL(oConstructor.constructorId)} alt={`${oConstructor.name} logo`} />
            </div>
         </div>
         <div className="card-end-split">
            <div className="end-number" style={teamColor} >
               {getDrivernumber(oDriver)}
            </div>
            <div className="end-img">
               <img src={getDriverImageURL(oDriver)} alt={`${sDriverName} portrait`} />
            </div>
         </div>
      </div>
   )
}

DriverCard.protoTypes = {
   Driver: PropTypes.object.isRequired,
   Constructors: PropTypes.array.isRequired,
   position: PropTypes.string.isRequired,
   points: PropTypes.string.isRequired
}

export default DriverCard;