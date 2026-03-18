import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { getDriverCardContent, getRaceCardContent, getTeamCardContent } from "../../utilities/CardUtils";
import { getCardClassArray } from "../../utilities/UsefullUtils";
import { driverAssignedToTeam } from "../../assets/defaultMapping";
import { getRaceCardHeaderStyle, getRaceCardStyle } from "../../utilities/RaceUtils";

const Card = ({ type, data, cardClass = 0, position, points }) => {
   const navigate = useNavigate();
   const arrCardClass = getCardClassArray();
   const className = arrCardClass[cardClass] || arrCardClass[0];

   const handleClick = () => {
      if (type === "race") {
         navigate(`/circuit/${data.circuit_short_name}`, { state: { nMeetingKey: data.meeting_key, nDefaultSessionKey: data.session_key, oRaceData: data } });
      } else if (type === "driver") {
         const oDriver = data?.Driver || data;
         const oConstructor = data?.Constructors?.at(-1) ?? driverAssignedToTeam[data.driverId];
         const oRanking = { position, points };
         navigate(`/driver/${oDriver.driverId}`, { state: { driver: oDriver, constructor: oConstructor, oRanking } });
      } else if (type === "team") {
         return;
         /*const oConstructor = data?.Constructor || data;
         navigate(`/team/${oConstructor.constructorId}`, { state: { constructor: data, position, points } });*/
      }
   };

   let cardContent;
   if (type === "race") {
      cardContent = getRaceCardContent(data, position);
   } else if (type === "driver") {
      cardContent = getDriverCardContent(data, position, points);
   } else if (type === "team") {
      cardContent = getTeamCardContent(data, position, points);
   }

   const cardStyle = useMemo(() => {
      if (type === "driver") {
         if (data) {
            const oConstructor = data?.Constructors?.at(-1) ?? driverAssignedToTeam[data.driverId];
            return { background: `var(--color-${oConstructor.constructorId})` };
         }
      } else if (type === "team") {
         const oConstructor = data?.Constructor || data;
         return { background: `var(--color-${oConstructor.constructorId})` };
      } else if (type === "race") {
         return getRaceCardStyle(data);
      }
      return { background: 'transparent' };
   }, [type, data]);

   const statusCardHeaderStyle = useMemo(() => {
      if (type === "race") {
         return getRaceCardHeaderStyle(data);
      }
      
      return {};
   }, [type]);

   return (
      <div className={className}
         style={cardStyle}
         onClick={handleClick}
         role="button"
         aria-label={`${type} card: ${type === 'race' ? data?.raceName : type === 'driver' ? data.Driver?.familyName : data?.Constructor?.name}`}
         key={`${type}-${data?.raceName || data.Driver?.familyName || data?.Constructor?.name}`}>
         <div className="card-header-container" style={statusCardHeaderStyle}>{cardContent?.header}</div>
         <div className="card-text-container" style={statusCardHeaderStyle}>
            {cardContent?.textBlock}
            {cardContent?.teamImgSrc && <img src={cardContent?.teamImgSrc} alt="team logo" loading="lazy" />}
         </div>
         <div className="card-main-container">            
            {cardContent?.main}
         </div>
         {(type == "team") && (
            <div className="card-details-container">
               {cardContent.teamDrivers.map((driver) => {
                  return <div>{driver.driver}</div>
               })}
            </div>
         )}
      </div>
   );
};

export default Card;

Card.propTypes = {
   type: PropTypes.oneOf(['race', 'driver', 'team']).isRequired,
   data: PropTypes.object.isRequired,
   cardClass: PropTypes.number,
   position: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   points: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};