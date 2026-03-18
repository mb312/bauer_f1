import { useDriverStanding } from "../context/DriverStandingContext";
const URL_TEAM_LOGOS = "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/";

export const LOGO_MAP_IDS = [{ apiKey: "red_bull", f1key: "red%20bull" },
{ apiKey: "sauber", f1key: "kick%20sauber" },
{ apiKey: "aston_martin", f1key: "aston%20martin" }];

export function getTeamLogoConstructorId(nConstructorId, arrMapping) {
   const oFound = arrMapping.find(element => element.apiKey === nConstructorId);
   return oFound ? oFound.f1key : nConstructorId;
}

export function getTeamLogoURL(nConstructorId) {
   return URL_TEAM_LOGOS + getTeamLogoConstructorId(nConstructorId, LOGO_MAP_IDS);
}

export function getDriversForTeam(nConstructorId) {
   const { arrDriverList } = useDriverStanding();
   if (arrDriverList[0]?.Constructors) {
      return arrDriverList.filter(driver => driver.Constructors[(driver.Constructors.length - 1)].constructorId === nConstructorId);
   }
   return [];
}