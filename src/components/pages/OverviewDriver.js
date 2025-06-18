import React, { useEffect, useRef } from "react";
import CardDriver from "../components/CardDriver";
import ButtonBackToTop from "../components/ButtonBackToTop";
import { useDriverStanding } from "../../context/DriverStandingContext";
import { useTranslation } from "react-i18next";

function OverviewDriver() {
   const { t } = useTranslation();
   const {arrDriverList, bLoading} = useDriverStanding();
      
   if (bLoading) return <div>t('loading')</div>;
   return (
      <div className="card-list-col-three">
         {arrDriverList.map((data) =>{
            return <CardDriver {...data} key={data.position} />
         })}
         <ButtonBackToTop />
      </div>      
  )
}

export default OverviewDriver;