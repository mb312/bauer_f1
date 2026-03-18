const WDC_MAP_NUMBER = 4;
const URL_DRIVER_BG = "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/2025Drivers/";

/* return the driver number, if the driver is WDC 2025 return 1 */
export function getDriverNumber(oDriver) {
   let nNumber = (Number(oDriver.permanentNumber)) ? Number(oDriver.permanentNumber) : 0;
   return (nNumber === WDC_MAP_NUMBER) ? 1 : nNumber;
}

/* return url for DriverImg with background */
export function getDriverBGImageURL(oDriver) {
   const sLastName = oDriver.familyName;
   return URL_DRIVER_BG + sLastName;
}

/* return the position of the driver in the last year */
export function getLastYearsPosition(jsData, oDriver) {
   const DRIVER_ID = oDriver.driverId;
   const driverStanding = jsData?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings;
   if (!driverStanding || !DRIVER_ID) return null;
   return driverStanding.find(standing => standing.Driver.driverId === DRIVER_ID) || null;
}