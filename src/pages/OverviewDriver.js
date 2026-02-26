import { useTranslation } from 'react-i18next';
import { useDriverStanding } from "../context/DriverStandingContext";
import Card from '../components/components/Card';
import ButtonBackToTop from "../components/components/ButtonBackToTop";
import { useYearContext } from '../context/YearContext';

function OverviewDriver() {
   const { t } = useTranslation();
   const {year} = useYearContext();
   const {arrDriverList, bLoading} = useDriverStanding();
   
   if (bLoading) return <div>t('loading')</div>;
   return (
      <div className='overview-container'>
         <h1>{t('driver_standing')} {year}</h1>
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