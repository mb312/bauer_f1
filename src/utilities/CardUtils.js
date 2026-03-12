import { getDriverNumber } from "./DriverUtils";
import { circuitImages, driverImages, teamLogoImages, teamCarImages } from '../assets/imageMappings';
import { getEventDate, getEventTime, getRaceCardDate } from "./UsefullUtils";
import { driverAssignedToTeam, teamDefaultData } from "../assets/defaultMapping";

export const getRaceCardContent = (data, position) => {
   let sImgKey = data.circuit_short_name.replace(/[\s-]/g, '');
   return {
      header: (
         <>
            <div>{position ? ("0" + position).slice(-2) : "--"}</div>
            <div>{getRaceCardDate(data)}</div>        
         </>
      ),
      textBlock: <div className="text-block">{data.country_code} - {data.circuit_short_name} Grand Prix</div>,
      imgSrc: circuitImages[sImgKey] || null,
      imgAlt: `${data.circuit_short_name} circuit`,
      imgBgText: "",
      teamImgSrc: null,
   };
}

export const getDriverCardContent = (data, position, points) => {
   const oDriver = data?.Driver || data;   
   const oConstructor = data?.Constructors?.at(-1) ?? driverAssignedToTeam[oDriver.driverId];
   return {
      header: (
            <>
               <div>{position ? ("0" + position).slice(-2) : "--"}</div>
               <div>{points ? points : 0} PTS</div>
            </>
         ),
         textBlock: <div className="text-block">{oDriver?.givenName + " " + oDriver?.familyName}</div>,
         teamImgSrc: teamLogoImages[oConstructor?.constructorId],
         imgSrc: driverImages[oDriver?.familyName.toLowerCase()],
         imgAlt: `${oDriver?.givenName} ${oDriver?.familyName}`,
         imgBgText: ("0" + getDriverNumber(oDriver)).slice(-2),
      };
}

export const getTeamCardContent = (data, position, points) => {
   const oConstructor = data?.Constructor ?? teamDefaultData[data.constructorId];
   return {
      header: (
         <>
            <div>{position ? ("0" + position).slice(-2) : "--"}</div>
            <div>{points} PTS</div>
         </>
      ),
      textBlock: <div className="text-block">{oConstructor.name}</div>,
      teamImgSrc: teamLogoImages[oConstructor.constructorId],
      imgSrc: teamCarImages[oConstructor.constructorId],
      imgAlt: `${oConstructor.name} car`,
      imgBgText: "",
      teamDrivers: Object.values(driverAssignedToTeam).filter(driver => driver.constructorId == oConstructor.constructorId),
   };
}