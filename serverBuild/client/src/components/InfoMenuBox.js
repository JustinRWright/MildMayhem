import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import KeyBoardIcon from '../images/KeyBoard.png';
import GamePadIcon from '../images/GamePad.png';
import ControlsButton from './ControlsButton.js';
class InfoMenuBox extends React.Component {
  constructor(props) {
            super(props);
            this.state = {showControls: false,
            showNotes: true,
            controlSetToggle1: true,
            controlSetToggle2: true,
            highlightControls: false,
            highlightNotes: false}; 
            
        }
    toggleControlsHighlight = () => {
        this.setState({highlightControls: !this.state.highlightControls});
    }
    toggleNotesHighlight = () => {
        this.setState({highlightNotes: !this.state.highlightNotes});
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
    let highlightControls = this.state.highlightControls;
    let highlightNotes = this.state.highlightNotes;

    let controls = this.state.showControls;
    let notes = this.state.showNotes;
    let textP1;
    let textP2;
    let textNotes;
    let keyBoardButtons;
    let gamePadButtons;
    let notesPageGridPadding;
    let controlColor = '#9A9A9A';
    let statColor = '#9A9A9A';
    if (highlightControls){
        controlsHighlightColor = '3px Solid Green';
    }
    if (highlightNotes){
        notesHighlightColor = '3px Solid Green';
    }
    if (controls){
        controlColor = '#9A9A9A';
        controlsHighlightColor = '3px solid #1f39bd';
        keyBoardButtons = <Grid item xs = {2}>
                            <ControlsButton id = {"keyboard1"} image={KeyBoardIcon} paddingTop = {35} onClick = {this.onClick} selected={this.state.controlSetToggle1}></ControlsButton>
                            <ControlsButton id = {"keyboard2"} image={KeyBoardIcon} paddingTop = {65} onClick = {this.onClick} selected={this.state.controlSetToggle2}></ControlsButton>
                        </Grid>;
        gamePadButtons = <Grid item xs = {2}>
                             <ControlsButton id = {"gamepad1"} image={GamePadIcon} paddingTop = {33} onClick = {this.onClick} selected={!this.state.controlSetToggle1}></ControlsButton>
                             <ControlsButton id = {"gamepad2"} image={GamePadIcon} paddingTop = {62} onClick = {this.onClick} selected={!this.state.controlSetToggle2}></ControlsButton>
                        </Grid>;
        
        if (controlSetToggle1){
            
            textP1 =  <div style = {{ backgroundColor: '#9A9A9A', fontSize: 14, borderRadius: 15, color: 'black', border: '1px solid black'}}>
            <p><u>Player1
            </u>
            <br></br>
            Movement: WASD
            <br></br>
            Sword Slash: SPACE
            <br></br>
            Lightning Bolt: O
            <br></br>
            Magic Blast: P
            <br></br>
            Dodge: SHIFT
            </p>
            </div>
        }
        else {
            
            textP1 = <div style = {{ backgroundColor: '#9A9A9A', fontSize: 14, borderRadius: 15, color: 'black', border: '1px solid black'}}>
            <p><u>Player1
            </u><br></br>
            Movement: Left Stick
            <br></br>
            Sword Slash: X<br></br>
            Magic Blast: Right Trigger
            <br></br>
            Lightning: Left Trigger
            <br></br>
           
            Dodge: Right Bumper
            </p>
            </div>
           
        }
         if (controlSetToggle2){
            textP2 =  <div style = {{ backgroundColor: '#9A9A9A', fontSize: 14, borderRadius: 15, color: 'black', border: '1px solid black'}}><p>
            <u>Player2
            </u>
            <br></br>
            Movement: ArrowKeys
            <br></br>
            Sword Slash: NumPad 0
            <br></br>
            Lightning: NumPad 8
            <br></br>
            Magic Blast: NumPad 9
            <br></br>
            Dodge: NumPad 4
            </p>
            </div>
         }
         else {
             textP2 = <div style = {{ backgroundColor: '#9A9A9A', fontSize: 14, borderRadius: 15, color: 'black', border: '1px solid black'}}>
            <p>
            <u>Player2
            </u><br></br>Movement: Left Stick<br></br>
            Sword Slash: X<br></br>
            Magic Blast: Right Trigger
            <br></br>
            Lightning: Left Trigger
            <br></br>
            Dodge: Right Bumper
            </p>
            </div>
         }
       
    }
    else if (notes){
        statColor = '#9A9A9A';
        notesHighlightColor = '3px solid #1f39bd';
        notesPageGridPadding = <Grid item xs = {2}> </Grid>
        textNotes = <div style = {{paddingTop: 13}}><div style = {{ backgroundColor: '#9A9A9A', fontSize: 14, borderRadius: 15, color: 'black', border: '1px solid black'}}>
        <p><u>v0.0.1</u> <br></br> <b>Hello, and welcome to Mild Mayhem!</b> <br></br>The goal is simple, defeat your opponent! Use your lightning bolts and magic blasts. You can deflect the magic blasts with your sword and dodge through attacks.</p>
        </div>
        </div>
        //textP1 = <p><br></br>So how's it goin'?<br></br><br></br>Wins: 0<br></br><br></br> Losses: 0<br></br><br></br> Perfect Wins: 0</p>
    }
    return <div style={{ paddingLeft: 20, paddingTop: 10, height: '100%'}}>
                <Grid container>
                    <Grid item xs = {6}>
                        <div onClick={this.showControls} onMouseEnter={this.toggleControlsHighlight} onMouseLeave={this.toggleControlsHighlight} style={{cursor: 'pointer', borderRadius: 15,backgroundColor: controlColor, textAlign: 'center', padding: 10, border: controlsHighlightColor}}>
                            Controls
                        </div>
                    </Grid>
                    <Grid item xs = {6}>
                        <div onClick={this.showNotes} onMouseEnter={this.toggleNotesHighlight} onMouseLeave={this.toggleNotesHighlight} style={{cursor: 'pointer', borderRadius: 15,backgroundColor: statColor, textAlign: 'center',  padding: 10, border: notesHighlightColor}}>
                            Notes
                        </div>
                    </Grid>
                    
                </Grid>
               
                <div style={{backgroundColor: 'black', borderRadius: 15, textAlign: 'center', color: '#39FF14',verticalAlign: 'center', fontSize: 13,height:220, border: '4px solid black'}}>
                    <Grid container>
                        {notesPageGridPadding}
                        {keyBoardButtons}
                        <Grid item xs = {8}>
                            {textP1}
                            {textNotes}
                            <div style={{paddingTop: 6}}>
                            </div>
                            {textP2}   
                           
                        </Grid>
                        {gamePadButtons}
                    </Grid>
                </div>
               
            </div>
}
}

export default InfoMenuBox;