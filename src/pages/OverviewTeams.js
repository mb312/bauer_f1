import { useTranslation } from "react-i18next";
import Card from '../components/components/Card';
import BackToTopButton from "../components/components/ButtonBackToTop";
import { useTeamStanding } from "../context/TeamStandingContext";

function OverviewTeams() {
   const { t } = useTranslation();
   const { arrTeamlist, bLoading } = useTeamStanding();

   if (bLoading) return <div>t('loading')</div>;

   return (
      <div>
         <h1>2025 Team's Standing</h1>
         <div className="card-list-col-auto-wide">
            {arrTeamlist.map((data) => (
               <Card type="team" data={data} cardClass={2} position={data.position} points={data.points} key={data.position}/>
            ))}
            <BackToTopButton />
         </div>
      </div>
   );
}

export default OverviewTeams;