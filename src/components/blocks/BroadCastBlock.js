import { broadcastChannel, broadcastChannelLogo } from '../../assets/defaultMapping'

function BroadCastBlock({ round }) {
    const arrBroadcastChannels = broadcastChannel;
    const arrBroadcastLogos = broadcastChannelLogo;
    const arrCurrentChannels = arrBroadcastChannels[round];

    return (
        <div className="event-block">
            <div className='event-block-logos'>
                {arrCurrentChannels.map((channel) => {
                    return <img src={arrBroadcastLogos[channel]} alt={channel} key={channel}/>
                })}
            </div>
        </div>
    )
}

export default BroadCastBlock