import React from 'react';
import Countdown from '../components/Countdown';

function MainCountdown({nextRaceDate}){
   return (
      <>
         <div className="timer-container">
            <Countdown toDate={nextRaceDate} />
         </div>
      </>
   )
}

export default MainCountdown;