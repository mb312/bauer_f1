
/* pass object with date and time */
export function getLocalStringDate(oDate){
   if (typeof oDate !=="object") return "";
   
   const dDate = new Date(`${oDate.date}T${oDate.time}`);
   return dDate ? dDate.toLocaleString("de-AT") : "";
}

/* return the date as DD.MonthName YYYY*/
export function getDateFormation(sDate){
   if (sDate === "") return "---"
   const dDate = new Date(sDate);
   return dDate.getDate()+"."+dDate.toLocaleString('default',{month:'long'})+" "+dDate.getFullYear();
}

export function getIsEventOver(oSession){
   if (!oSession) return true;
   const dDate = new Date(`${oSession.date}T${oSession.time}`);
   const dNow = new Date();
   return (dDate<dNow) ? true : false;
}