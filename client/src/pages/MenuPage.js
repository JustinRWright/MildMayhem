import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MatchRoomBox from '../components/MatchRoomBox.js';
import InfoMenuBox from '../components/InfoMenuBox.js';
import LocalGameImage from '../images/GameShot5.png';
import OnlineGameImage from '../images/OnlineGame.png';
import { Link } from 'react-router-dom';

class MenuPage extends React.Component {
  constructor(props) {
            super(props);
            this.state = {controls: {
                player1: {
                    Movement: 'WASD',
                    SwordSlash: 'SPACE',
                    MagicBlast: 'P'
                },
                player2: {
                    Movement: 'ArrowKeys',
                    SwordSlash: 'NumPad0',
                    MagicBlast: 'NumPad9'
                }
            }};
        };
  controlConfigSelected = (controlConfig) => {
      if (controlConfig === "keyboard1"){
          this.setState({controls: {
              player1: {
                Movement: 'WASD',
                SwordSlash: 'SPACE',
                MagicBlast: 'P'
              },
              player2: this.state.controls.player2

          }});
      }
      else if (controlConfig === "keyboard2"){
          this.setState({controls: {
              player1: this.state.controls.player1,
              player2: {
                Movement: 'ArrowKeys',
                SwordSlash: 'NumPad0',
                MagicBlast: 'NumPad9'
              },

          }});
      }
      else if (controlConfig === "gamepad1"){
          this.setState({controls: {
              player1: {
                Movement: 'GamePad',
                SwordSlash: '',
                MagicBlast: ''
              },
              player2: this.state.controls.player2

          }});
      }
      else if (controlConfig === "gamepad2"){
          this.setState({controls: {
              player1: this.state.controls.player1,
              player2: {
                Movement: 'GamePad',
                SwordSlash: '',
                MagicBlast: ''
              },

          }});
      }
  };
  matchRoomClicked = () => {
      
      this.props.passControlConfig(this.state.controls);
  };
  render() {
    
    return <div style={{backgroundColor: '#031316', borderRadius: 15, maxWidth: 800, minWidth:800, minHeight:600, maxHeight:600, margin: 'auto'}}>
    <Grid container>
        <Grid item xs={12}>
            <div style={{textAlign: 'center', borderRadius: 15, backgroundColor: 'black', fontSize: 30, fontFamily: 'Audiowide', padding: 20, border: '4px solid #1f39bd'}}>
            <div style={{color: '#39FF14'}}><u>
            Mild Mayhem
            </u>
            </div>
            
            </div>
        </Grid>
        <Grid item xs={4}>
            <InfoMenuBox setControlConfig={this.controlConfigSelected}></InfoMenuBox>
        </Grid>

        <Grid item xs = {4}>
            <div style={{paddingTop: 40, paddingBottom: 30}}>
                <Link style={{color: 'black'}}>
                <MatchRoomBox image={OnlineGameImage} matchType={'Start Online Room'}></MatchRoomBox>
                </Link>
            </div>
        </Grid>
        <Grid item xs = {4}>
            <div style={{paddingTop: 40, paddingBottom: 30}}> 
                <Link to='/game' style={{color: 'black'}}>
                    <MatchRoomBox onClick={this.matchRoomClicked} image={LocalGameImage} matchType={'Start Local Room'}></MatchRoomBox>
                </Link>
            </div>
            
        </Grid>
        <Grid item xs = {1}>
        </Grid>
        <Grid item xs = {10}>
                <div style={{ borderRadius: 15, backgroundColor: '#9A9A9A', textAlign: 'center', verticalAlign: 'top', padding: 100, border: '1px solid'}}>Available Online Matches</div>
        </Grid>
        <Grid item xs = {1}>
        </Grid>
    </Grid>
   
  </div>
}
}

export default MenuPage;