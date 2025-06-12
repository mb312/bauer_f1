import React from "react";
import { useTranslation } from "react-i18next";

function OverviewRaces(){
   const {t} = useTranslation();
   return (
      <>
         <div className="container">
            <div className="data-container">
               <h1>{t('coming_soon')}</h1>
            </div>
         </div>
      </>
   )
}

export default OverviewRaces;