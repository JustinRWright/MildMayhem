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
            //console.log("props menupage are" + JSON.stringify(this.props));
        };
  controlConfigSelected = (controlConfig) => {
      //console.log("controlConfig is: " + controlConfig);
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
                Movement: 'WASD',
                SwordSlash: 'SPACE',
                MagicBlast: 'P'
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
      //console.log("matchroom clicked");
      this.props.passControlConfig(this.state.controls);
  };
  render() {
    
    return <div style={{maxWidth: 800, minWidth:800, minHeight:600, maxHeight:600, margin: 'auto'}}>
    <Grid container>
        <Grid item xs={12}>
            <div style={{textAlign: 'center', padding: 20, border: '1px solid'}}>Select a Match</div>
        </Grid>
        <Grid item xs={4}>
            <InfoMenuBox setControlConfig={this.controlConfigSelected}></InfoMenuBox>
        </Grid>

        <Grid item xs = {4}>
            <div style={{paddingTop: 40, paddingBottom: 40}}>
                <MatchRoomBox image={OnlineGameImage} matchType={'Create Online Room'}></MatchRoomBox>
            </div>
        </Grid>
        <Grid item xs = {4}>
            <div style={{paddingTop: 40, paddingBottom: 40}}> 
                <Link to='/game'>
                    <MatchRoomBox onClick={this.matchRoomClicked} image={LocalGameImage} matchType={'Create Local Room'}></MatchRoomBox>
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