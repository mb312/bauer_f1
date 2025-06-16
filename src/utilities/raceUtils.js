const URL_TRACK = "https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/";
const URL_FLAG = "https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Flags%2016x9/";
const TRACK_MAP = [{apiKey: "UK", f1key: "Great%20Britain"},
                  {apiKey: "UAE", f1key: "Abu%20Dhabi"}]
const FLAG_MAP = [{apiKey: "Saudi Arabia", f1key: "saudi-arabia"},
                  {apiKey: "USA", f1key: "united-states"},
                  {apiKey: "UK", f1key: "united-kingdom"},
                  {apiKey: "UAE", f1key: "united-arab-emirates"}]

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