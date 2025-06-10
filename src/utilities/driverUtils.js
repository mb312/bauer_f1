const WDC_MAP_NUMBER = 33;
const URL_DRIVER_IMAGE = "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/";
//const URL_DRIVER_BG = "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/2025Drivers/";
//const URL_HELMET = "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets2025/";

/* return assigned driver number - return 1 if 33 */
export function getDrivernumber(oDriver){
   let nNumber = Number(oDriver.permanentNumber);
   return (nNumber === WDC_MAP_NUMBER) ? 1 : nNumber;
}

export function getDriverName(oDriver){
   const sFirstName = oDriver.givenName;
   const sLastName = oDriver.familyName;

   return (sLastName === "Antonelli") ? "Kimi "+sLastName : sFirstName+" "+sLastName; 
}

/* return url for DriverImg without background */
export function getDriverImageURL(oDriver){
   const sEnd = "01.png";
   const sLastName = oDriver.familyName;
   const sFirstName = oDriver.givenName;
   const sLetter = sFirstName.substring(0,1).toUpperCase();
   const sMix = sFirstName.substring(0,3).toUpperCase()+sLastName.substring(0,3).toUpperCase();
   
   return URL_DRIVER_IMAGE+sLetter+"/"+sMix+"01_"+sFirstName+"_"+sLastName+"/"+sMix.toLowerCase()+sEnd;
}