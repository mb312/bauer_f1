import { getDriverNumber } from "./driverUtils";
import { circuitImages, driverImages, teamLogoImages, teamCarImages } from '../assets/imageMappings';
import { getEventDate, getEventTime } from "./UsefullUtils";

export const getRaceCardContent = (data) => {
   return {
      header: (
         <>
            <div>{data.round ? ("0" + data.round).slice(-2) : "--"}</div>
            <div>{getEventDate(data) + " " + getEventTime(data)}</div>
         </>
      ),
      textBlock: <div className="text-block">{data.raceName}</div>,
      imgSrc: circuitImages[data.Circuit.circuitId],
      imgAlt: `${data.raceName} circuit`,
      imgBgText: "",
      teamImgSrc: null,
   };
}

export const getDriverCardContent = (data, position, points) => {
   const oDriver = data.Driver;
   const oConstructor = data.Constructors[data.Constructors.length - 1];
   return {
      header: (
         <>
            <div>{position ? ("0" + position).slice(-2) : "--"}</div>
            <div>{points} PTS</div>
         </>
      ),
      textBlock: <div className="text-block">{oDriver?.givenName + " " + oDriver?.familyName}</div>,
      teamImgSrc: teamLogoImages[oConstructor.constructorId],
      imgSrc: driverImages[oDriver?.familyName.toLowerCase()],
      imgAlt: `${oDriver?.givenName} ${oDriver?.familyName}`,
      imgBgText: ("0" + getDriverNumber(oDriver)).slice(-2),
   };
}

export const getTeamCardContent = (data, position, points) => {
   const oConstructor = data.Constructor;
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
   };
}