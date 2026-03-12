import { driverAssignedToTeam } from "../assets/defaultMapping";
import { useDriverStanding } from "../context/DriverStandingContext";

const URL_TEAM_LOGOS = "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/";
const URL_TEAM_LOGOS_MINI = "https://media.formula1.com/content/dam/fom-website/teams/2025/";
const URL_TEAM_CARS = "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2025/";

export const LOGO_MAP_IDS = [{ apiKey: "red_bull", f1key: "red%20bull" },
                              { apiKey: "sauber", f1key: "kick%20sauber" },
                              { apiKey: "aston_martin", f1key: "aston%20martin" }];
export const MINI_LOGO_MAP_IDS = [{ apiKey: "red_bull", f1key: "red-bull-racing" },
                                 { apiKey: "sauber", f1key: "kick-sauber" },
                                 { apiKey: "aston_martin", f1key: "aston-martin" },
                                 { apiKey: "rb", f1key: "racing-bulls" }];
export const DRIVER_COLOR_KEY = [{ apiKey: 'Aston Martin',colorKey: 'aston_martin'},
                                 { apiKey: 'Ferrari',colorKey: 'ferrari'},
                                 { apiKey: 'Williams',colorKey: 'williams'},
                                 { apiKey: 'Red Bull Racing',colorKey: 'red_bull'},
                                 { apiKey: 'Mercedes',colorKey: 'mercedes'},
                                 { apiKey: 'Haas F1 Team',colorKey: 'haas'},
                                 { apiKey: 'McLaren', colorKey:'mclaren'},
                                 { apiKey: "Kick Sauber", colorKey: "sauber" },
                              ]
                              
export function getTeamLogoConstructorId(nConstructorId,arrMapping) {
  const oFound = arrMapping.find(element => element.apiKey === nConstructorId);
  return oFound ? oFound.f1key : nConstructorId;
}

export function getTeamLogoURL(nConstructorId){
   return URL_TEAM_LOGOS+getTeamLogoConstructorId(nConstructorId,LOGO_MAP_IDS);
}

export function getMiniTeamLogoURL(nConstructorId){
   return URL_TEAM_LOGOS_MINI+getTeamLogoConstructorId(nConstructorId,MINI_LOGO_MAP_IDS)+"-logo.png";
}

export function getTeamCarURL(nConstructorId){
   return URL_TEAM_CARS+getTeamLogoConstructorId(nConstructorId,MINI_LOGO_MAP_IDS)+".png"
}

export function getDriversForTeam(nConstructorId){
   const {arrDriverList} = useDriverStanding();
   if (arrDriverList[0]?.Constructors){
      return arrDriverList.filter(driver => driver.Constructors[(driver.Constructors.length-1)].constructorId === nConstructorId);
   }
   return [];
}

export function getConstrocturIdWithDriverNo(oDriver,nNumber){
   const {arrDriverList} = useDriverStanding();
   
   let sDriverNo = (nNumber && nNumber>0) ? nNumber : oDriver.driver_number;
   if (sDriverNo == 1) sDriverNo=4;
   let sTeamId = "";

   arrDriverList.map((driver) => {
      if (driver.permanentNumber == sDriverNo){
         if (driver.Constructors){
            sTeamId = driver.Constructors[(driver.Constructors.length-1)].constructorId;
         }else{
            sTeamId = driverAssignedToTeam[driver.driverId] ? sTeamId = driverAssignedToTeam[driver.driverId].constructorId : sTeamId = "";
         }
      }
   });

   //console.log(sTeamId)
   if (sTeamId !== "") return sTeamId;
   
   DRIVER_COLOR_KEY.map((oFind) => {
      if (oFind.apiKey === oDriver.team_name) return sTeamId = oFind.colorKey;
   })   

   return sTeamId;
}