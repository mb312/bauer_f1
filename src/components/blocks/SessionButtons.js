import React, { useState } from "react";

function SessionButtons({ arrSessions, nSessionKey, onSelect }) {
   const [nActiveSessionKey, setActiveSessionKey] = useState(nSessionKey);
   const toggleButton = (session) => {
      (nActiveSessionKey === session.session_key) ? setActiveSessionKey(null) : setActiveSessionKey(session.session_key);
      onSelect(session.session_key);
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