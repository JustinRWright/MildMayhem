import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import KeyBoardIcon from '../images/KeyBoard.png';
import GamePadIcon from '../images/GamePad.png';
import ControlsButton from './ControlsButton.js';
class InfoMenuBox extends React.Component {
  constructor(props) {
            super(props);
            this.state = {showControls: true,
            showStats: true,
            controlSetToggle1: true,
            controlSetToggle2: true}; 
            
        }
    
    showStats = () => {
      this.setState({showControls: false, showStats: true});

    }
    showControls = () => {
      this.setState({showControls: true, showStats: false});

    }
    setKeyBoard = () => {
        
    }
    setGamePad = () => {
       
    }
    onClick = (id) =>
    {
        //console.log("Button Clicked!!"+id);
        if (id === "keyboard1" || id === "gamepad1"){
            this.setState({controlSetToggle1: !this.state.controlSetToggle1});
            if(!this.state.controlSetToggle1){
                this.props.setControlConfig(id);
            }
            else {
                 this.props.setControlConfig(id);
            }
        }
        else if (id === "keyboard2" || id === "gamepad2"){
            this.setState({controlSetToggle2: !this.state.controlSetToggle2});
             if(!this.state.controlSetToggle2){
                this.props.setControlConfig(id);
            }
            else {
                 this.props.setControlConfig(id);
            }
        }
    }
   
  render() {
    let controlSetToggle1 = this.state.controlSetToggle1;
    let controlSetToggle2 = this.state.controlSetToggle2;
    
    let controls = this.state.showControls;
    let stats = this.state.showStats;
    let textP1;
    let textP2;
    let keyBoardButtons;
    let gamePadButtons;
    let statsPageGridPadding;
    let controlColor = '#FFFFFF';
    let statColor = '#FFFFFF';
    if (controls){
        controlColor = '#9A9A9A';
        keyBoardButtons = <Grid item xs = {2}>
                            <ControlsButton id = {"keyboard1"} image={KeyBoardIcon} paddingTop = {45} onClick = {this.onClick} selected={this.state.controlSetToggle1}></ControlsButton>
                            <ControlsButton id = {"keyboard2"} image={KeyBoardIcon} paddingTop = {25} onClick = {this.onClick} selected={this.state.controlSetToggle2}></ControlsButton>
                        </Grid>;
        gamePadButtons = <Grid item xs = {2}>
                            <ControlsButton id = {"gamepad1"} image={GamePadIcon} paddingTop = {40} onClick = {this.onClick} selected={!this.state.controlSetToggle1}></ControlsButton>
                             <ControlsButton id = {"gamepad2"} image={GamePadIcon} paddingTop = {22} onClick = {this.onClick} selected={!this.state.controlSetToggle2}></ControlsButton>
                        </Grid>;
        
        if (controlSetToggle1){
            textP1 = <p>Welcome to Mild Mayhem!!<br></br><br></br><div style = {{border: '1px solid'}}><u>Player1
            </u><br></br>Movement: WASD<br></br>
            Sword Slash: SPACE<br></br>
            Magic Blast: P
            <br></br>
            </div>
            </p>
            
           
        }
        else {
            textP1 = <p>Welcome to Mild Mayhem!!<br></br><br></br><div style = {{border: '1px solid'}}><u>Player1
            </u><br></br>Movement: Left Stick<br></br>
            Sword Slash: X<br></br>
            Magic Blast: Right Trigger
            <br></br>
            </div>
            </p>
           
           
        }
         if (controlSetToggle2){
            textP2 = <p><div style = {{border: '1px solid'}}>
            <u>Player2
            </u><br></br>Movement: ArrowKeys<br></br>
            Sword Slash: NumPad 0<br></br>
            Magic Blast: NumPad 9
            </div>
            </p>
         }
         else {
             textP2 = <p><div style = {{border: '1px solid'}}>
            <u>Player2
            </u><br></br>Movement: Left Stick<br></br>
            Sword Slash: X<br></br>
            Magic Blast: Right Trigger
            </div>
            </p>
         }
       
    }
    else if (stats){
        statColor = '#9A9A9A';
        statsPageGridPadding = <Grid item xs = {2}> </Grid>
        textP1 = <p><br></br>So how's it goin'?<br></br><br></br>Wins: 0<br></br><br></br> Losses: 0<br></br><br></br> Perfect Wins: 0</p>
    }
    return <div style={{height: '100%'}}>
                <Grid container>
                    <Grid item xs = {6}>
                        <div onMouseOver={this.showControls} style={{backgroundColor: controlColor, textAlign: 'center', padding: 10, border: '1px solid'}}>
                            Controls
                        </div>
                    </Grid>
                    <Grid item xs = {6}>
                        <div onMouseOver={this.showStats} style={{backgroundColor: statColor, textAlign: 'center',  padding: 10, border: '1px solid'}}>
                            Stats
                        </div>
                    </Grid>
                    
                </Grid>
               
                <div style={{textAlign: 'center', verticalAlign: 'center', fontSize: 13,height:200, border: '1px solid'}}>
                    <Grid container>
                        {statsPageGridPadding}
                        {keyBoardButtons}
                        <Grid item xs = {8}>
                            {textP1}
                            {textP2}   
                        </Grid>
                        {gamePadButtons}
                    </Grid>
                </div>
               
            </div>
}
}

export default InfoMenuBox;