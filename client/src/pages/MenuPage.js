import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MatchRoomBox from '../components/MatchRoomBox.js';
import InfoMenuBox from '../components/InfoMenuBox.js';
import LocalGameImage from '../images/GameShot5.png';
import OnlineGameImage from '../images/OnlineGame.png';
import { Link } from 'react-router-dom';
import {subscribeToOnlineRoomCreate} from '../api';
class MenuPage extends React.Component {
  constructor(props) {
            super(props);
           
            
            this.state = {
                rooms: [],
                controls: {
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
componentDidMount(){
    subscribeToOnlineRoomCreate((err, room) => {
        console.log("room is: " + room);
       
        let newRooms =  this.state.rooms;
        newRooms = newRooms.concat(room);
        console.log("newRooms is: " + newRooms);
        this.setRoomState(newRooms);
        //this.setState({rooms: newRooms});
        console.log('this.state.rooms is: ' + this.state.rooms);
    });
}
componentDidUpdate(){
  
}
setRoomState = (newRooms) => {
    this.setState({rooms: newRooms});
}
/*Function passed into the infoMenuBox, Sets the control config object which then gets passed up to App.js and then down into the GamePage component and the phaser game 
Perhaps custom controls here can detect keycodes and translate directly into a keycode value that gets passed into phaser
For example, an option to click on swordslash and press a key to get the key code(ex: SPACE), then send that to the phaser game where it will
be set as the attack.*/
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
  //When a match room is clicked, the control config is passed to the game for the game start
  matchRoomClicked = (gameType) => {
      this.props.passGameConfig(gameType);
      this.props.passControlConfig(this.state.controls);
  };
  gameSelect = (gameType) => {
      this.props.passGameConfig(gameType)
  }
  render() {
    let roomCount = this.state.rooms;
    console.log('roomCount is: ' + roomCount);
    let joinMatchBox;
    if(this.state.rooms){
       
      /*  joinMatchBox = roomCount.forEach(room => { 
            console.log("this ran");
            return(<MatchRoomBox onClick={() => this.matchRoomClicked('joinOnline')} image={LocalGameImage} matchType={'Room1'}></MatchRoomBox>)
        
        })
         console.log("joinMatchBox is: " + joinMatchBox);
          */
    }
   
    
    
    //I set the resolution to 800*600, which is the size of an old school NewGrounds web game. It is currently not responsive
    //This could be changed for a mobile depoloyment or something
    return <div style={{backgroundColor: '#031316', borderRadius: 15, maxWidth: 800, minWidth:800, minHeight:600, maxHeight:600, margin: 'auto'}}>
    <Grid container>
        {/*Title Bar*/}
        <Grid item xs={12}>
            <div style={{textAlign: 'center', borderRadius: 15, backgroundColor: 'black', fontSize: 30, fontFamily: 'Audiowide', padding: 20, border: '4px solid #1f39bd'}}>
                <div style={{color: '#39FF14'}}>
                    <u>
                        Mild Mayhem
                    </u>
                </div>
            
            </div>
        </Grid>
        {/*Interactive information box*/}
        <Grid item xs={4}>
            <InfoMenuBox setControlConfig={this.controlConfigSelected}></InfoMenuBox>
        </Grid>

        {/*Online match box*/}
        <Grid item xs = {4}>
            <div style={{paddingTop: 40, paddingBottom: 30}}>
                <Link to='/game' style={{color: 'black'}}>
                    <MatchRoomBox onClick={() => this.matchRoomClicked('createOnline')} image={OnlineGameImage} matchType={'Start Online Room'}></MatchRoomBox>
                </Link>
            </div>
        </Grid>

        {/*Offline match box*/}
        <Grid item xs = {4}>
            <div style={{paddingTop: 40, paddingBottom: 30}}> 
                {/*route to game*/}
                <Link to='/game' style={{color: 'black'}}>
                    <MatchRoomBox onClick={() => this.matchRoomClicked('offline')} image={LocalGameImage} matchType={'Start Local Room'}></MatchRoomBox>
                </Link>
            </div>
        </Grid>

        {/*List of available online rooms*/}
        <Grid item xs = {1}>
        </Grid>

        <Grid item xs = {10}>
                <div style={{textAlign: 'center', paddingTop: 15}}>
                Available Online Matches
                </div>
                <div style={{ borderRadius: 15, backgroundColor: '#9A9A9A', align: 'left', textAlign: 'left', minHeight:200, maxHeight:200, border: '1px solid'}}>
                <Grid container>
                {
                    roomCount.map((room, index) => (
                        <Grid item xs = {4}>
                            <MatchRoomBox key={index} onClick={() => this.matchRoomClicked('joinOnline')} image={LocalGameImage} matchType={room}></MatchRoomBox>
                        </Grid>
                    ))

                      
                }
                </Grid>
                
                </div>
        </Grid>

        <Grid item xs = {1}>
        </Grid>
    </Grid>
   
  </div>
}
}

export default MenuPage;