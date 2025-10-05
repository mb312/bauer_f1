import { useTranslation } from "react-i18next";
import { getEventDate, getEventTime, getIsEventOver, getLocalStringDate } from "./UsefullUtils";

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
   const arrSessions = [{ title: t('first_practice'), date: getEventDate(oRace.FirstPractice), time: getEventTime(oRace.FirstPractice), dateTime: new Date(`${oRace.FirstPractice.date}T${oRace.FirstPractice.time}`) },
                        { title: t('qualifying'), date: getEventDate(oRace.Qualifying), time: getEventTime(oRace.Qualifying), dateTime: new Date(`${oRace.Qualifying.date}T${oRace.Qualifying.time}`) },
                        { title: t('grand_prix'), date: getEventDate(oGrandPrix), time: getEventTime(oGrandPrix), dateTime: new Date(`${oGrandPrix.date}T${oGrandPrix.time}`) }];
   if (oRace.Sprint) {
      arrSessions.push({ title: t('sprint_qualifying'), date: getEventDate(oRace.SprintQualifying), time: getEventTime(oRace.SprintQualifying), dateTime: new Date(`${oRace.SprintQualifying.date}T${oRace.SprintQualifying.time}`) });
      arrSessions.push({ title: t('sprint'), date: getEventDate(oRace.Sprint), time: getEventTime(oRace.Sprint), dateTime: new Date(`${oRace.Sprint.date}T${oRace.Sprint.time}`) });
   } else {
      arrSessions.push({ title: t('second_practice'), date: getEventDate(oRace.SecondPractice), time: getEventTime(oRace.SecondPractice), dateTime: new Date(`${oRace.SecondPractice.date}T${oRace.SecondPractice.time}`) });
      arrSessions.push({ title: t('third_practice'), date: getEventDate(oRace.ThirdPractice), time: getEventTime(oRace.ThirdPractice), dateTime: new Date(`${oRace.ThirdPractice.date}T${oRace.ThirdPractice.time}`) });
   }

   arrSessions.sort((a,b) => a.dateTime>b.dateTime);
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