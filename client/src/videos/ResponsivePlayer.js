import {React, Component} from 'react';
import ReactPlayer from "react-player";
import localPVPVideo from '../videos/LocalPVP.mp4';
const ResponsivePlayer = () => {
    
        
    
    return (
        <div>
            <div className='player-wrapper'>
            <ReactPlayer
                className='react-player'
                url={localPVPVideo}
                width='100%'
                height='100%'
                playing={true}
                loop={true}
                muted={true}
                controls={false}

            />
            </div>
        </div>
    )
}

export default ResponsivePlayer;