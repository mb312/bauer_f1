import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useYearContext } from "./YearContext";

const DriverStandingContext = createContext();

export function DriverStandingProvider({children}){
   const {year} = useYearContext();
   const [arrDriverList, setDriverList] = useState([]);
   const [bLoading, setLoading] = useState(true);
      
   useEffect(() => {
      const loadData = async() =>{
         try{
            const URL_DRIVERSTANDING = `https://api.jolpi.ca/ergast/f1/${year}/driverstandings/`;
            const URL_DRIVERLIST = `https://api.jolpi.ca/ergast/f1/${year}/drivers/`;
            let res = await fetch(URL_DRIVERSTANDING);            
            let data = await res.json();
            let oStanding = data?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings || {};
            if (data.MRData.total==0){
               const fallbackRes = await fetch(URL_DRIVERLIST);
               data = await fallbackRes.json();
               oStanding = data.MRData.DriverTable.Drivers;
            }
            setDriverList(oStanding);
            setLoading(false);
         }catch(e){
            console.error(e)
         }
      }
      loadData();
   },[]);
   
   return (
      <DriverStandingContext.Provider value={{arrDriverList, bLoading}}>
         {children}
      </DriverStandingContext.Provider>
   )
}

export function useDriverStanding(){
   return useContext(DriverStandingContext);
}