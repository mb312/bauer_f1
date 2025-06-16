import { useDriverStanding } from "../context/DriverStandingContext";

const URL_TEAM_LOGOS = "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/";
const URL_TEAM_LOGOS_MINI = "https://media.formula1.com/content/dam/fom-website/teams/2025/";
const URL_TEAM_CARS = "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2025/";
//const URL_FLAGS = "https://media.formula1.com/image/upload/f_auto/q_auto/v1677244974/content/dam/fom-website/2018-redesign-assets/Flags%2016x9/"

export const LOGO_MAP_IDS = [
  { apiKey: "red_bull", f1key: "red%20bull" },
  { apiKey: "sauber", f1key: "kick%20sauber" },
  { apiKey: "aston_martin", f1key: "aston%20martin" }
];

export const MINI_LOGO_MAP_IDS = [
  { apiKey: "red_bull", f1key: "red-bull-racing" },
  { apiKey: "sauber", f1key: "kick-sauber" },
  { apiKey: "aston_martin", f1key: "aston-martin" },
  { apiKey: "rb", f1key: "racing-bulls" }
];

export function getTeamLogoConstructorId(constructorId,arrMapping) {
  const found = arrMapping.find(element => element.apiKey === constructorId);
  return found ? found.f1key : constructorId;
}

export function getTeamLogoURL(constructorId){
   return URL_TEAM_LOGOS+getTeamLogoConstructorId(constructorId,LOGO_MAP_IDS);
}

export function getMiniTeamLogoURL(constructorId){
   return URL_TEAM_LOGOS_MINI+getTeamLogoConstructorId(constructorId,MINI_LOGO_MAP_IDS)+"-logo.png";
}

export function getTeamCarURL(constructorId){
   return URL_TEAM_CARS+getTeamLogoConstructorId(constructorId,MINI_LOGO_MAP_IDS)+".png"
}

export function getDriversForTeam(constructorId){
   const {driverList} = useDriverStanding();
   return driverList.filter(driver => driver.Constructors[(driver.Constructors.length-1)].constructorId === constructorId);
}

export function getConstrocturIdWithDriverNo(sDriverNo){
   const {driverList} = useDriverStanding();
   if (sDriverNo == 1) sDriverNo=33;
   let sTeamId = "";
   driverList.map((driver) => {
      if (driver.Driver.permanentNumber == sDriverNo) return sTeamId = driver.Constructors[(driver.Constructors.length-1)].constructorId;
   });

   return sTeamId;
}