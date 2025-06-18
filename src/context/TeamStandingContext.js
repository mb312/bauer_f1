import React, { createContext, useContext, useEffect, useState } from "react";

const URL_TEAM_STANDING = "https://api.jolpi.ca/ergast/f1/2025/constructorstandings/";
const TeamStandingContext = createContext();

export function TeamStandingProvider({ children }) {
  const [arrTeamlist, setTeamList] = useState([]);
  const [bLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(URL_TEAM_STANDING)
      .then(res => res.json())
      .then(data => {
        let oStanding = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        setTeamList(oStanding);
        setLoading(false);
      }).catch((error) => {
         console.error("Error getting team standing:",error);
      });
  }, []);

  return (
    <TeamStandingContext.Provider value={{ arrTeamlist, bLoading }}>
      {children}
    </TeamStandingContext.Provider>
  );
}

export function useTeamStanding() {
  return useContext(TeamStandingContext);
}