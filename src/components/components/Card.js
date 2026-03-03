import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { getDriverCardContent, getRaceCardContent, getTeamCardContent } from "../../utilities/CardUtils";
import { getCardClassArray, getLocalStringDate } from "../../utilities/UsefullUtils";
import { driverAssignedToTeam } from "../../assets/defaultMapping";

const Card = ({ type, data, cardClass = 0, position, points }) => {
   const navigate = useNavigate();
   const arrCardClass = getCardClassArray();
   const className = arrCardClass[cardClass] || arrCardClass[0];
   const imgClass = (type == "race") ? "raceImg" : "";

   const handleClick = () => {
      if (type === "race") {
         return;
         /*const oRace = { FirstPractice: data.FirstPractice, date: data.date };
         const oDate = getLocalStringDate(data.FirstPractice);
         navigate(`/circuit/${oDate}`, { state: { eventNo: 0, oWeekend: oRace } });*/
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
      cardContent = getRaceCardContent(data);
   } else if (type === "driver") {
      cardContent = getDriverCardContent(data, position, points);
   } else if (type === "team") {
      cardContent = getTeamCardContent(data, position, points);
   }

   const cardStyle = useMemo(() => {
      if (type === "driver") {
         const oConstructor = data?.Constructors?.at(-1) ?? driverAssignedToTeam[data.driverId];
         return { background: `var(--color-${oConstructor.constructorId})` };
      } else if (type === "team") {
         const oConstructor = data?.Constructor || data;
         return { background: `var(--color-${oConstructor.constructorId})` };
      }
      return {};
   }, [type, data]);

   return (
      <div className={className}
         style={cardStyle}
         onClick={handleClick}
         role="button"
         aria-label={`${type} card: ${type === 'race' ? data?.raceName : type === 'driver' ? data.Driver?.familyName : data?.Constructor?.name}`}>
         <div className="card-header-container">{cardContent?.header}</div>
         <div className="card-text-container">
            {cardContent?.textBlock}
            {cardContent?.teamImgSrc && <img src={cardContent?.teamImgSrc} alt="team logo" loading="lazy" />}
         </div>
         <div className="card-img-container">
            <div className="img-bg-text">{cardContent?.imgBgText}</div>
            <img src={cardContent.imgSrc} alt={cardContent?.imgAlt} className={imgClass} loading="lazy" />
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