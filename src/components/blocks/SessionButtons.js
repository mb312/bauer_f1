import React, { useState } from "react";

function SessionButtons({ sessions, selectedSession, onSelect }) {
   const [activeSessionKey, setActiveSessionKey] = useState(selectedSession.session_key);

   const toggleButton = (session) => {
      (activeSessionKey === session.session_key) ? setActiveSessionKey(null) : setActiveSessionKey(session.session_key);
      onSelect(session);
   };

   return (
      <div className="session-buttons">
         {sessions.map((session) => (
            <button key={session.session_key}
               className={activeSessionKey === session.session_key ? 'active' : ''}
               onClick={() => toggleButton(session)}>{session.session_name}</button>
         ))}
      </div>
   );
}

export default SessionButtons;