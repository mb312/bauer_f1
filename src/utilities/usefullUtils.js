
/* pass object with date and time */
export function getLocalStringDate(oDate){
   if (typeof oDate !=="object") return "";
   
   const dDate = new Date(`${oDate.date}T${oDate.time}`);
   return dDate ? dDate.toLocaleString("de-AT") : "";
}