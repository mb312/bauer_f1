import CardTeam from "../components/CardTeam";
import { useTeamStanding } from "../../context/TeamStandingContext";
import BackToTopButton from "../components/ButtonBackToTop";
import { useTranslation } from "react-i18next";

function OverviewTeams() {
   const { t } = useTranslation();
   const { arrTeamlist, bLoading } = useTeamStanding();

   if (bLoading) return <div>t('loading')</div>;

   return (
      <div className="card-list-col-two">
         {arrTeamlist.map((data) => (
            <CardTeam {...data} key={data.position} />
         ))}
         <BackToTopButton />
      </div>
   );
}

export default OverviewTeams;