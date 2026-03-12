import { useDriverStanding } from "../context/DriverStandingContext";
import DriverTable from "../components/blocks/DriverTable";
import NextRaceSection from "../components/blocks/NextRaceSection";

function Home() {
   const { arrDriverList } = useDriverStanding();  
   let bHasData = (Object.keys(arrDriverList).length>0);
   return (
      <div className="main-content">
         <NextRaceSection />
         <section className="next-spliter"></section>
         {bHasData && <DriverTable arrDriverList={arrDriverList} />}
      </div>
   )
}

export default Home;