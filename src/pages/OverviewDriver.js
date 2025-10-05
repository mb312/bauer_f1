import Card from '../components/components/Card';
import ButtonBackToTop from "../components/components/ButtonBackToTop";
import { useDriverStanding } from "../context/DriverStandingContext";

function OverviewDriver() {   
   const {arrDriverList, bLoading} = useDriverStanding();
      
   if (bLoading) return <div>t('loading')</div>;
   return (
      <div>
         <h1>2025 Driver's Standing</h1>
         <div className="card-list-col-auto-large">
            {arrDriverList.map((data) =>{
               return <Card type="driver" data={data} cardClass={1} position={data.position} points={data.points} key={data.position} />
            })}
         </div>      
         <ButtonBackToTop />
      </div>
  )
}

export default OverviewDriver;