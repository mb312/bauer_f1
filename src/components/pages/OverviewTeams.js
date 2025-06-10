import React, { useEffect, useRef } from "react";
import TeamCard from "../components/TeamCard";
import { useTeamStanding } from "../../context/TeamStandingContext";

function OverviewTeams() {
   const { teamlist, loading } = useTeamStanding();
   const firstRender = useRef(true);

   useEffect(() => {
      if (firstRender.current)firstRender.current = false;
   }, []);

   if (loading) return <div>Loading...</div>;

   return (
      <div className="card-list-col-two">
         {teamlist.map((data) => (
            <TeamCard {...data} key={data.position} />
         ))}
      </div>
   );
}

export default OverviewTeams;