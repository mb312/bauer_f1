import Countdown from '../components/Countdown';

function MainCountdown({dNextRaceDate}){
   return (
      <div className="timer-container">
         <Countdown dToDate={dNextRaceDate} />
      </div>
   )
}

export default MainCountdown;