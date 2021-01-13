import React from 'react'
import Grid from '@material-ui/core/Grid'

import ReactPlayer from "react-player"
import ResponsivePlayer from '../videos/ResponsivePlayer.js';
const Stats = () => {
  return (
    <div >
        <div style={{fontFamily: 'Audiowide, cursive'  
   ,fontSize: '50px'}}>
            Wins: 0
         </div>
        <div style={{fontFamily: 'Audiowide, cursive'  
   ,fontSize: '50px'}}>
            Losses: 0
        </div>

    </div>
  )
}

export default Stats;