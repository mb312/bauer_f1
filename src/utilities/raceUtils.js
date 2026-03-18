import { circuitImages } from "../assets/imageMappings";
import RacePodium from "../components/components/RacePodium";
import { useRaceList } from "../context/RaceContext";
export const CANCELLED_CIRCUITS = ["Sakhir", "Jeddah"];

/* returns true if the race is cancelled, false otherwise */
export function isRaceCancelled(circuitShortName) {
    return CANCELLED_CIRCUITS.includes(circuitShortName);
}

/* returns the cancelled img element for cancelled races */
export function getRaceCancelledImg() {
    const CANCELLED_ICON = "https://unpkg.com/feather-icons/dist/icons/x.svg";
    return <img src={CANCELLED_ICON} alt="Cancelled" style={{ marginLeft: '4px', filter: 'invert(19%) sepia(96%) saturate(7496%) hue-rotate(357deg) brightness(97%) contrast(119%)' }} />;
}

/* returns true if the race is in the past, false otherwise */
export function isRaceInPast(data) {
    const eventDate = new Date(data.date_start);
    const today = new Date();
    return eventDate < today;
}

/* returns true if the race is today, false otherwise */
export function isRaceToday(data) {
    const eventDate = new Date(data.date_start);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
}

/* returns the Card Style for races in different states (past, upcoming) */
export function getRaceCardStyle(data) {
    return (isRaceInPast(data)) ? { background: 'var(--main-light-grey)' } : { background: 'transparent' };
}

/* returns the Card-Header Style for races in different states (cancelled, past, upcoming) */
export function getRaceCardHeaderStyle(data) {
    if (isRaceCancelled(data.circuit_short_name)) return { background: 'var(--main-light-grey)', color: 'var(--main-grey)' };
    if (isRaceInPast(data)) return { background: 'var(--main-grey)' };
    if (isRaceToday(data)) return { background: 'var(--main-red)' };

    return { background: 'var(--main-black)' };
}

export function getRaceCardMain(data) {
    let sImgKey = data.circuit_short_name.replace(/[\s-]/g, '');
    let bCancelled = (isRaceCancelled(data.circuit_short_name)) ? true : false;
    let sStyle = bCancelled ? { opacity: 0.5 } : {};
    let sImgSrc = circuitImages[sImgKey] || null;
    let sImgAlt = `${data.circuit_short_name} circuit`;
    let sImgBgTxt = "";

    if (isRaceInPast(data)) {
        const { arrPodium } = useRaceList();
        if (arrPodium.length > 0){
            let oCurrent = arrPodium.filter(({ race }) => race.session_key === data.session_key);
            let arrRacePodium = oCurrent[0]?.podiumSitter || [];
            return (
                <>
                    <div className="podium-container">
                        {arrRacePodium.map((sitter) => {
                            return <RacePodium driver={sitter} key={sitter.position} />
                        })}
                    </div>
                </>
            )
        }
    }
    return (
        <>
            <div className="img-bg-text">{sImgBgTxt}</div>
            <img src={sImgSrc} alt={sImgAlt} loading="lazy" className="raceImg" style={sStyle} />
        </>
    );
}