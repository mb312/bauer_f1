import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useYearContext } from "./YearContext";

const TeamStandingContext = createContext();

export function TeamStandingProvider({ children }) {
  const { year } = useYearContext();
  const [arrTeamlist, setTeamList] = useState([]);
  //const [arrCurTeamList, setCurTeamList] = useState([]);
  const [bLoading, setLoading] = useState(true);
  const firstRun = useRef(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const URL_TEAMSTANDING = `https://api.jolpi.ca/ergast/f1/${year}/constructorstandings/`;
        const URL_TEAMLIST = `https://api.jolpi.ca/ergast/f1/${year}/constructors/`;
        let res = await fetch(URL_TEAMSTANDING);
        let data = await res.json();
        let oStanding = data?.MRData?.StandingsTable?.StandingsLists[0]?.ConstructorStandings || {};
        if (data.MRData.total == 0) {
          const fallbackRes = await fetch(URL_TEAMLIST);
          data = await fallbackRes.json();
          oStanding = data.MRData.ConstructorTable.Constructors;
        }
        setTeamList(oStanding);
        setLoading(false);
      } catch (e) {
        console.error(e)
      }
    }
    loadData();
  }, [year]);

  return (
    <TeamStandingContext.Provider value={{ arrTeamlist, bLoading }}>
      {children}
    </TeamStandingContext.Provider>
  );
}

export function useTeamStanding() {
  return useContext(TeamStandingContext);
}