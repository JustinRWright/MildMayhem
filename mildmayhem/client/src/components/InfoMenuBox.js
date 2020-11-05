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
            showNotes: true,
            controlSetToggle1: true,
            controlSetToggle2: true}; 
            
        }
    
    showNotes = () => {
      this.setState({showControls: false, showNotes: true});
    }
    showControls = () => {
      this.setState({showControls: true, showNotes: false});
    }
    onClick = (id) =>
    {
        if (id === "keyboard1" || id === "gamepad1"){
            
            this.setState({controlSetToggle1: !this.state.controlSetToggle1});
            
                this.props.setControlConfig(id);
           
        }
        else if (id === "keyboard2" || id === "gamepad2"){
            this.setState({controlSetToggle2: !this.state.controlSetToggle2});
             
                this.props.setControlConfig(id);
           
        }
    }
   
  render() {
    let controlSetToggle1 = this.state.controlSetToggle1;
    let controlSetToggle2 = this.state.controlSetToggle2;
    let controlsHighlightColor = '3px solid black';
    let notesHighlightColor = '3px solid black';
    let controls = this.state.showControls;
    let notes = this.state.showNotes;
    let textP1;
    let textP2;
    let keyBoardButtons;
    let gamePadButtons;
    let notesPageGridPadding;
    let controlColor = '#9A9A9A';
    let statColor = '#9A9A9A';
    if (controls){
        controlColor = '#9A9A9A';
        controlsHighlightColor = '3px solid #1f39bd';
        keyBoardButtons = <Grid item xs = {2}>
                            <ControlsButton id = {"keyboard1"} image={KeyBoardIcon} paddingTop = {46} onClick = {this.onClick} selected={this.state.controlSetToggle1}></ControlsButton>
                            <ControlsButton id = {"keyboard2"} image={KeyBoardIcon} paddingTop = {50} onClick = {this.onClick} selected={this.state.controlSetToggle2}></ControlsButton>
                        </Grid>;
        gamePadButtons = <Grid item xs = {2}>
                             <ControlsButton id = {"gamepad1"} image={GamePadIcon} paddingTop = {45} onClick = {this.onClick} selected={!this.state.controlSetToggle1}></ControlsButton>
                             <ControlsButton id = {"gamepad2"} image={GamePadIcon} paddingTop = {43} onClick = {this.onClick} selected={!this.state.controlSetToggle2}></ControlsButton>
                        </Grid>;
        
        if (controlSetToggle1){
            textP1 = <p><u>Player1
            </u><br></br>Movement: WASD<br></br>
            Sword Slash: SPACE<br></br>
            Magic Blast: P
            <br></br>
            
            </p>
        }
        else {
            textP1 = <p><u>Player1
            </u><br></br>Movement: Left Stick<br></br>
            Sword Slash: X<br></br>
            Magic Blast: Right Trigger
            <br></br>
            
            </p>
           
           
        }
         if (controlSetToggle2){
            textP2 = <p>
            <u>Player2
            </u><br></br>Movement: ArrowKeys<br></br>
            Sword Slash: NumPad 0<br></br>
            Magic Blast: NumPad 9
            </p>
         }
         else {
             textP2 = <p>
            <u>Player2
            </u><br></br>Movement: Left Stick<br></br>
            Sword Slash: X<br></br>
            Magic Blast: Right Trigger
           
            </p>
         }
       
    }
    else if (notes){
        statColor = '#9A9A9A';
        notesHighlightColor = '3px solid #1f39bd';
        notesPageGridPadding = <Grid item xs = {2}> </Grid>
        let textNotes = <p></p>
        //textP1 = <p><br></br>So how's it goin'?<br></br><br></br>Wins: 0<br></br><br></br> Losses: 0<br></br><br></br> Perfect Wins: 0</p>
    }
    return <div style={{ paddingLeft: 20, paddingTop: 20, height: '100%'}}>
                <Grid container>
                    <Grid item xs = {6}>
                        <div onClick={this.showControls} style={{cursor: 'pointer', borderRadius: 15,backgroundColor: controlColor, textAlign: 'center', padding: 10, border: controlsHighlightColor}}>
                            Controls
                        </div>
                    </Grid>
                    <Grid item xs = {6}>
                        <div onClick={this.showNotes} style={{cursor: 'pointer', borderRadius: 15,backgroundColor: statColor, textAlign: 'center',  padding: 10, border: notesHighlightColor}}>
                            Notes
                        </div>
                    </Grid>
                    
                </Grid>
               
                <div style={{backgroundColor: 'black', borderRadius: 15, textAlign: 'center', color: '#39FF14',verticalAlign: 'center', fontSize: 13,height:200, border: '4px solid black'}}>
                    <Grid container>
                        {notesPageGridPadding}
                        {keyBoardButtons}
                        <Grid item xs = {8}>
                            <p>Welcome to Mild Mayhem!!<br></br>
                            <br></br>
                            </p>
                            <div style = {{ backgroundColor: '#9A9A9A', fontSize: 14, borderRadius: 15, color: 'black', border: '1px solid black'}}>
                                {textP1}
                            </div>
                            <div style={{paddingTop: 20}}>
                            </div>
                            <div style = {{ backgroundColor: '#9A9A9A', fontSize: 14, borderRadius: 15, color: 'black', border: '1px solid black'}}>
                                {textP2}   
                            </div>
                        </Grid>
                        {gamePadButtons}
                    </Grid>
                </div>
               
            </div>
}
}

export default InfoMenuBox;