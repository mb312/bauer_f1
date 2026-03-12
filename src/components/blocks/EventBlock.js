import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const EventBlock = (props) => {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const session = props.session;
   
   const handleClick = () => {
      navigate(`/circuit/${session.circuit_short_name}`, { state: { nMeetingKey: session.meeting_key, nDefaultSessionKey: session.session_key, oRaceData: session } });
   }

   return (
      <div className="event-block">
         <div className="event-date">
            <div className="event-day">{new Date(session.date_start).toLocaleString('de-DE', { month: 'short', day: 'numeric' })}</div>
            <div className="event-time">{new Date(session.date_start).toLocaleString('de-DE', { hour: '2-digit', minute: '2-digit' })}</div>
         </div>
         <div className="event-details">
            <div className="event-title">{t(session.session_name.toLowerCase().replace(" ", "_"))}</div>
         </div>
         <div className="event-icon" onClick={handleClick}>
            <span role="img" aria-label="details"><i className="fa-solid fa-circle-info"></i></span>
         </div>
      </div>
   )
}

export default EventBlock;