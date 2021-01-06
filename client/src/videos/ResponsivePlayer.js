import {React, Component} from 'react';
import ReactPlayer from "react-player";
import styles from '../videos/responsive-player.css';
import localPVPVideo from '../videos/WorkingShowcase.mp4';
import { Link, useHistory } from 'react-router-dom';

const ResponsivePlayer = () => {
    const history = useHistory();
    function startMatch() {
        history.push("/game");
    }    
    
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
            <div onClick={startMatch} className='play-button'>
                PLAY
            </div>
            </div>
        </div>
    )
}

export default ResponsivePlayer;