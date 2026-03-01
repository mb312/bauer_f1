const EventBlock = (props) => {
   const session = props.session;
   
   return (
      <div className="event-block">
         <div className="event-date">
            <div className="event-day">{session.date}</div>
            <div className="event-time">{session.time}</div>
         </div>
         <div className="event-details">
            <div className="event-title">{session.title}</div>
         </div>
         <div className="event-icon">
            <span role="img" aria-label="details"><i className="fa-solid fa-circle-info"></i></span>
         </div>
      </div>
   )
}

export default EventBlock;