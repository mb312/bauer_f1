import { useTranslation } from "react-i18next";
import Card from "../components/Card";

function DriverTable({arrDriverList}) {
   const { t } = useTranslation();
   
   return (
      <section className="driver-table">
         <div className="card-list-col-auto">            
            {arrDriverList.map((data,index) => (
               <Card type="driver" data={data} position={data.position} points={data.points} key={index} />
            ))}
         </div>
      </section>
   )
}

export default DriverTable