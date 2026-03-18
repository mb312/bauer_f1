import { getDriverNumber } from "./DriverUtils";
import { driverImages, teamLogoImages, teamCarImages } from '../assets/imageMappings';
import { getRaceCardDate } from "./UsefullUtils";
import { driverAssignedToTeam, teamDefaultData } from "../assets/defaultMapping";
import { getRaceCancelledImg, getRaceCardMain, isRaceCancelled } from "./RaceUtils";

export const getRaceCardContent = (data, position) => {
   let bCancelled = (isRaceCancelled(data.circuit_short_name)) ? true : false;

   return {
      header: (
         <>
            <div>{position ? ("0" + position).slice(-2) : "--"}</div>
            {bCancelled ? (
               <div>{getRaceCancelledImg()}</div>
            ) : (
               <div>{getRaceCardDate(data)}</div>
            )}
         </>
      ),
      main: getRaceCardMain(data),
      textBlock: <div className="text-block">{data.country_code} - {data.circuit_short_name} Grand Prix</div>,
      teamImgSrc: null,
   };
}

export const getDriverCardContent = (data, position, points) => {
   const oDriver = data?.Driver || data;
   const oConstructor = data?.Constructors?.at(-1) ?? driverAssignedToTeam[oDriver.driverId];
   let sImgSrc = driverImages[oDriver?.familyName.toLowerCase()]
   let sImgAlt = `${oDriver?.givenName} ${oDriver?.familyName}`;
   let sImgBgTxt = ("0" + getDriverNumber(oDriver)).slice(-2);
   return {
      header: (
         <>
            <div>{position ? ("0" + position).slice(-2) : "--"}</div>
            <div>{points ? points : 0} PTS</div>
         </>
      ),
      main: (
         <>
            <div className="img-bg-text">{sImgBgTxt}</div>
            <img src={sImgSrc} alt={sImgAlt} loading="lazy" />
         </>
      ),
      textBlock: <div className="text-block">{oDriver?.givenName + " " + oDriver?.familyName}</div>,
      teamImgSrc: teamLogoImages[oConstructor?.constructorId],
   };
}

export const getTeamCardContent = (data, position, points) => {
   const oConstructor = data?.Constructor ?? teamDefaultData[data.constructorId];
   let sImgSrc = teamCarImages[oConstructor.constructorId]
   let sImgAlt = `${oConstructor.name} car`;
   let sImgBgTxt = "";
   return {
      header: (
         <>
            <div>{position ? ("0" + position).slice(-2) : "--"}</div>
            <div>{points} PTS</div>
         </>
      ),
      main: (
         <>
            <div className="img-bg-text">{sImgBgTxt}</div>
            <img src={sImgSrc} alt={sImgAlt} loading="lazy" />
         </>
      ),
      textBlock: <div className="text-block">{oConstructor.name}</div>,
      teamImgSrc: teamLogoImages[oConstructor.constructorId],
      teamDrivers: Object.values(driverAssignedToTeam).filter(driver => driver.constructorId == oConstructor.constructorId),
   };
}