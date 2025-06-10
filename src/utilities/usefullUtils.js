
/* pass object with date and time */
export function getLocalStringDate(oDate){
   if (typeof oDate !=="object") return "";
   
   const dDate = new Date(`${oDate.date}T${oDate.time}`);
   return dDate ? dDate.toLocaleString("de-AT") : "";
}

/* return the date as DD.MonthName YYYY*/
export function getDateFormation(sDate){
   const dDate = new Date(sDate);
   return dDate.getDate()+"."+dDate.toLocaleString('default',{month:'long'})+" "+dDate.getFullYear();
}