import { useTranslation } from "react-i18next";
import { getIsEventOver, getLocalStringDate } from "./usefullUtils";

const URL_TRACK = "https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/";
const URL_FLAG = "https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Flags%2016x9/";
const TRACK_MAP = [{apiKey: "UK", f1key: "Great%20Britain"},
                  {apiKey: "UAE", f1key: "Abu%20Dhabi"}]
const FLAG_MAP = [{apiKey: "Saudi Arabia", f1key: "saudi-arabia"},
                  {apiKey: "USA", f1key: "united-states"},
                  {apiKey: "UK", f1key: "united-kingdom"},
                  {apiKey: "UAE", f1key: "united-arab-emirates"}]

export function getRaceSessions(oRace,oGrandPrix){
   const { t } = useTranslation();
   const arrSessions = [{title: t('first_practice'),date: getLocalStringDate(oRace.FirstPractice),isOver: getIsEventOver(oRace.FirstPractice)},
                        {title: t('qualifying'),date:getLocalStringDate(oRace.Qualifying),isOver: getIsEventOver(oRace.Qualifying)},
                        {title: t('grand_prix'),date:getLocalStringDate(oGrandPrix),isOver: getIsEventOver(oGrandPrix)}]
   if (oRace.Sprint) {
      arrSessions.push({title: t('sprint_qualifying'),date:getLocalStringDate(oRace.SprintQualifying),isOver:getIsEventOver(oRace.SprintQualifying)});
      arrSessions.push({title: t('sprint'), date:getLocalStringDate(oRace.Sprint),isOver:getIsEventOver(oRace.Sprint)});
   }else{
      arrSessions.push({title: t('second_practice'),date:getLocalStringDate(oRace.SecondPractice), isOver: getIsEventOver(oRace.SecondPractice)});
      arrSessions.push({title: t('third_practice'),date:getLocalStringDate(oRace.ThirdPractice), isOver: getIsEventOver(oRace.ThirdPractice)});
   }

   arrSessions.sort((a,b) => a.date>b.date);
   return arrSessions;
}

export function getTrackImg(oRace,bWhite){
   let sCountry = oRace.Circuit.Location.country;
   const oMapped = TRACK_MAP.find(element => element.apiKey === sCountry);
   if (oMapped) sCountry = oMapped.f1key;

   if (bWhite) return URL_TRACK+sCountry+".png";
   return URL_TRACK+sCountry+"%20carbon.png";
}

export function getTrackFlagImg(oRace){
   let sCountry = oRace.Circuit.Location.country;
   const oMapped = FLAG_MAP.find(element => element.apiKey == sCountry);
   if (oMapped) sCountry = oMapped.f1key;

   return URL_FLAG+sCountry+"-flag.png"
}