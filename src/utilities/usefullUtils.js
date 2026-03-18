/* transform number into 0X or if long 00X */
export function setZeroInfrontOfNumber(nNumber, bLong) {
   if (bLong) return nNumber.toString().padStart(3, "0");
   return nNumber.toString().padStart(2, "0");
}

/* return the date as DD.MonthName YYYY*/
export function getDateFormation(sDate, bLong) {
   if (sDate === "") return "---"

   const dDate = new Date(sDate);
   let sReturn = dDate.getDate() + ". " + dDate.toLocaleString('default', { month: 'short' }) + " " + dDate.getFullYear();
   if (bLong) sReturn += " " + dDate.getHours() + ":" + setZeroInfrontOfNumber(dDate.getMinutes());

   return sReturn;
}

/* change laptime (seconds) in Minutes:SS:MSS */
export function formatLapTime(nSeconds) {
   if (typeof nSeconds !== "number" || isNaN(nSeconds)) return "-";

   const nHour = Math.floor(nSeconds / 3600);
   const nMinutes = Math.floor(nSeconds / 60);
   const nSec = Math.floor(nSeconds % 60);
   const nMilliSec = Math.round((nSeconds - nMinutes * 60 - nSec) * 1000);
   if (nHour > 0) {
      return `${nHour.toString().padStart(2, "0")}:${setZeroInfrontOfNumber(nMinutes % 60)}:${setZeroInfrontOfNumber(nSec)}.${setZeroInfrontOfNumber(nMilliSec, true)}`;
   }

   return `${nMinutes.toString().padStart(2, "0")}:${setZeroInfrontOfNumber(nSec)}.${setZeroInfrontOfNumber(nMilliSec, true)}`;
}

/* return an array of card classes */
export function getCardClassArray() {
   return ["card", "card-large", "card-wide", "card border"];
}

/* return formated date for race card display */
export function getRaceCardDate(oRace) {
   const dDate = new Date(oRace.date_start);
   const nDay = dDate.toLocaleDateString('en-GB', { day: '2-digit' });
   const sMonth = dDate.toLocaleDateString('en-GB', { month: 'short' });
   const time = dDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

   return `${nDay} ${sMonth} ${time}`;
}

/* */
export function getCircuitDetailName(oRace){   
   return oRace?.country_name + " - " + oRace?.circuit_short_name;
}

export function getCircuitDetailDate(oRace){
   const sDate = new Date(oRace.date_start).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' , year: 'numeric'});
   const sTime = new Date(oRace.date_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
   return `${sDate} ${sTime}`;
}