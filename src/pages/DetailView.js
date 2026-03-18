import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ButtonBack from '../components/components/ButtonBack';
import '../styles/DetailView.css';
import { driverImages } from '../assets/imageMappings';
import { getDateFormation } from '../utilities/UsefullUtils';
import { getDriverNumber, getLastYearsPosition } from '../utilities/DriverUtils';

function DetailView() {
    const { state } = useLocation();
    const { driver, constructor, oRanking } = state || {};
    const CURRENT_YEAR = new Date().getFullYear();
    const LAST_YEAR = CURRENT_YEAR - 1;
    const [lastYearStanding, setLastYearStanding] = useState(null);
    const driverImage = driverImages[driver?.familyName.toLowerCase()]
    const driverName = driver?.givenName + " " + driver?.familyName;
    const nDriverNr = ("0" + getDriverNumber(driver)).slice(-2);

    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.setProperty('--color-detail-light', `var(--color-${constructor.constructorId})`);
            containerRef.current.style.setProperty('--color-detail-dark', `var(--color-${constructor.constructorId}-dark)`);
        }
    }, [constructor.constructorId])

    useEffect(() => {
        if (!driver?.driverId) return;

        const fetchLastYearStanding = async () => {
            try {
                const response = await fetch(`https://api.jolpi.ca/ergast/f1/${LAST_YEAR}/driverstandings/`);
                const data = await response.json();
                setLastYearStanding(getLastYearsPosition(data, driver));
            } catch (error) {
                console.error("Error fetching last year standing:", error);
            }
        };

        fetchLastYearStanding();
    }, [driver?.driverId]);

    return (
        <div className='detail-container' ref={containerRef}>
            <div className='detail-header'>
                <ButtonBack />
            </div>
            <div className='detail-area'>
                <div className='detail-left'>
                    <div className='detail-title'>{driverName}</div>
                    <div className='detail-row'>
                        <div className='detail-row-title'>Team:</div>
                        <div>{constructor?.name}</div>
                    </div>
                    <div className='detail-row'>
                        <div className='detail-row-title'><i className="fa-solid fa-cake-candles"></i></div>
                        <div>{getDateFormation(driver.dateOfBirth)}</div>
                    </div>
                    <div className='detail-row'>
                        <div className='detail-row-title'>{CURRENT_YEAR + ": "}</div>
                        <div>{(oRanking?.position || "-") + " (" + (oRanking?.points || "0") + " PTS)"}</div>
                    </div>
                    <div className='detail-row'>
                        <div className='detail-row-title'>{LAST_YEAR + ": "}</div>
                        <div>{(lastYearStanding?.position || "-") + " " + (lastYearStanding?.points ? `(${lastYearStanding.points} PTS)` : "")}</div>
                    </div>
                </div>
                <div className='detail-right'>
                    <div className="img-bg-text">{nDriverNr}</div>
                    <img src={driverImage}></img>
                </div>
            </div>
            <div className='detail-footer'></div>
        </div>
    )
}

export default DetailView