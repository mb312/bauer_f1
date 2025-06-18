import React, { createContext, useContext, useEffect, useState } from "react";

const URL_DRIVERSTANDING = 'https://api.jolpi.ca/ergast/f1/2025/driverstandings/';
const DriverStandingContext = createContext();

export function DriverStandingProvider({children}){
   const [arrDriverList, setDriverList] = useState([]);
   const [bLoading, setLoading] = useState(true);
   
   useEffect(() => {
      fetch(URL_DRIVERSTANDING)
         .then(res => res.json())
         .then(data => {
            let oStanding = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            setDriverList(oStanding);
            setLoading(false);
         }).catch((error) => {
            console.error("Error fetching driver standing:",error);
         });
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