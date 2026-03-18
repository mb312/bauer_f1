import { driverNumberData } from "../../assets/defaultMapping"
import { driverImages } from "../../assets/imageMappings";
import { setZeroInfrontOfNumber } from "../../utilities/UsefullUtils";

function RacePodium({ driver }) {
    const oInfo = driverNumberData[driver.driver_number];
    return (
        <div className="podium-card" style={{background: `var(--color-${oInfo.constructorId})`}}>
            <div>{setZeroInfrontOfNumber(driver.position)}</div>
            <img src={driverImages[oInfo?.lastName.toLowerCase()]} />
            <div>{oInfo.firstName.substring(0,1)}. {oInfo.lastName}</div>
        </div>
    )
}

export default RacePodium