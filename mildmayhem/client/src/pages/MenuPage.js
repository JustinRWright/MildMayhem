import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MatchRoomBox from '../components/MatchRoomBox.js';
import InfoMenuBox from '../components/InfoMenuBox.js';
import LocalGameImage from '../images/GameShot.png';
import OnlineGameImage from '../images/OnlineGame.png';
import { Link } from 'react-router-dom';

class MenuPage extends React.Component {
  
  render() {
    
    return <div style={{maxWidth: 800, minWidth:800, minHeight:600, maxHeight:600, margin: 'auto'}}>
    <Grid container>
        <Grid item xs={12}>
            <div style={{textAlign: 'center', padding: 20, border: '1px solid'}}>Select a Match</div>
        </Grid>
        <Grid item xs={4}>
            <InfoMenuBox></InfoMenuBox>
        </Grid>

        <Grid item xs = {4}>
            <div style={{paddingTop: 40, paddingBottom: 40}}>
                <MatchRoomBox image={OnlineGameImage} matchType={'Create Online Room'}></MatchRoomBox>
            </div>
        </Grid>
        <Grid item xs = {4}>
            <div style={{paddingTop: 40, paddingBottom: 40}}> 
                <Link to='/game'>
                    <MatchRoomBox image={LocalGameImage} matchType={'Create Local Room'}></MatchRoomBox>
                </Link>
            </div>
            
        </Grid>
        <Grid item xs = {12}>
                <div style={{textAlign: 'center', verticalAlign: 'top', padding: 100, border: '1px solid'}}>Available Online Matches</div>
        </Grid>
    </Grid>
   
  </div>
}
}

export default MenuPage;