/* pass object with date and time */
export function getLocalStringDate(oDate) {
   if (typeof oDate !== "object") return "";

   const dDate = new Date(`${oDate.date}T${oDate.time}`);
   return dDate ? dDate.toLocaleString("de-AT", {day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'}) : "";
}

/* transform number into 0X or if long 00X */
export function setZeroInfrontOfNumber(nNumber,bLong){
   if (bLong) return nNumber.toString().padStart(3, "0");
   return nNumber.toString().padStart(2, "0");
}

/* return the date as DD.MonthName YYYY*/
export function getDateFormation(sDate, bLong) {
   if (sDate === "") return "---"
   
   const dDate = new Date(sDate);
   let sReturn = dDate.getDate() + ". " +dDate.toLocaleString('default', { month: 'long' }) +" " + dDate.getFullYear();
   if (bLong) sReturn += " " + dDate.getHours() + ":" + setZeroInfrontOfNumber(dDate.getMinutes());

   return sReturn;
}

/* change laptime (seconds) in Minutes:SS:MSS */
export function formatLapTime(nSeconds) {
   if (typeof nSeconds !== "number" || isNaN(nSeconds)) return "-";
   
   const nMinutes = Math.floor(nSeconds / 60);
   const nSec = Math.floor(nSeconds % 60);
   const nMilliSec = Math.round((nSeconds - nMinutes * 60 - nSec) * 1000);
   return `${nMinutes.toString().padStart(2, "0")}:${setZeroInfrontOfNumber(nSec)}.${setZeroInfrontOfNumber(nMilliSec,true)}`;
}

/* check if the event date/time is in the past */
export function getIsEventOver(oSession) {
   if (!oSession) return true;
   
   const dDate = new Date(`${oSession.date}T${oSession.time}`);
   const dNow = new Date();
   return (dDate < dNow) ? true : false;
}

/* check if current date is between 1st practise and race */
export function getRaceActive(oRace) {
   const dNow     = new Date();
   const dStart   = new Date(oRace.FirstPractice.date);
   const dEnd     = new Date(oRace.date);
   return (dNow >= dStart && dNow <= dEnd) ? true : false;
}

export function getLastPositionOfDriver(arrPositions) {
   const arrResult = {};
   for (let i = arrPositions.length - 1; i >= 0; i--) {
      const oEntry = arrPositions[i];
      const { driver_number } = oEntry;

      if (!arrResult[driver_number]) arrResult[driver_number] = oEntry;
      if (arrResult.length === 20) return Object.values(arrResult).sort((a, b) => a.position - b.position);;
   }

   return Object.values(arrResult).sort((a, b) => a.position - b.position);;
}

export function getStartingPostionOfDriver(arrPositions,nDriverNumber){
   const arrResult = {};
   for (let i = 0; i<arrPositions.length; i++) {
      const entry = arrPositions[i];
      const { driver_number } = entry;

      if (!arrResult[driver_number]) arrResult[driver_number] = entry;
      if (arrResult.length === 20) return Object.values(arrResult).sort((a, b) => a.position - b.position);;
   }

   return Object.values(arrResult).sort((a, b) => a.position - b.position);;
}

export function getReorderByLastPosition(arrDriver, arrPositions){
   const arrRankingOrder = arrPositions.sort((a, b) => a.position - b.position)
                                       .map(entry => entry.driver_number);
   const arrReorderDriver = arrDriver.sort((a, b) =>{
      const aIndex = arrRankingOrder.indexOf(a.driver_number);
      const bIndex = arrRankingOrder.indexOf(b.driver_number);

      return aIndex - bIndex;
   })
   
   return arrReorderDriver
}

export function getDriverRaceResultPoints(nPosition){
   switch(nPosition){
      case 1: return "+25";
      case 2: return "+18";
      case 3: return "+15";
      case 4: return "+12";
      case 5: return "+10";
      case 6: return "+8";
      case 7: return "+6";
      case 8: return "+4";
      case 9: return "+2";
      case 10: return "+1";
      default: return "0"
   }
}

export function getSessionFilter(oWeekend){
   if (!oWeekend) return "meeting_key=latest";

   const oStart = new Date(oWeekend.FirstPractice.date);
   const sStart = oStart.getFullYear()+"-"+setZeroInfrontOfNumber((oStart.getMonth()+1))+"-"+oStart.getDate();
   const oEnd = new Date(oWeekend.date);
   const sEnd = oEnd.getFullYear()+"-"+setZeroInfrontOfNumber((oEnd.getMonth()+1))+"-"+(oEnd.getDate()+1);

   return "date_start>="+sStart+"&date_end<="+sEnd;
}