import React, { useState } from "react";

function SessionButtons({ arrSessions, oSelectedSession, onSelect }) {
   const [nActiveSessionKey, setActiveSessionKey] = useState(oSelectedSession.session_key);
   const toggleButton = (session) => {
      (nActiveSessionKey === session.session_key) ? setActiveSessionKey(null) : setActiveSessionKey(session.session_key);
      onSelect(session);
   };

   return (
      <div className="session-buttons">
         {arrSessions.map((session) => (
            <button  key={session.session_key}
                     className={nActiveSessionKey === session.session_key ? 'active' : ''}
                     onClick={() => toggleButton(session)}>{session.session_name}</button>
         ))}
      </div>
   );
}

export default SessionButtons;