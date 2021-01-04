import {React, Component} from 'react';
import ReactPlayer from "react-player";
import styles from '../videos/responsive-player.css';
import localPVPVideo from '../videos/MidSatShowcase.mp4';

const ResponsivePlayer = () => {
    
        
    
    return (
        <div style={{height: "100%"}}>
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
            <div className='play-button'>
                PLAY
            </div>
            </div>
        </div>
    )
}

export default ResponsivePlayer;