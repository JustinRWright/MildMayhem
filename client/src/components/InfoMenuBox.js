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
    //Highlights controls tab on menu box
    toggleControlsHighlight = () => {
        this.setState({highlightControls: !this.state.highlightControls});
    }
    //Highlights notes tab on menu box
    toggleNotesHighlight = () => {
        this.setState({highlightNotes: !this.state.highlightNotes});
    }
    //Toggles text under tabs
    showNotes = () => {
      this.setState({showControls: false, showNotes: true});
    }
    //Toggles text under tabs
    showControls = () => {
      this.setState({showControls: true, showNotes: false});
    }
    //Callback that was passed a prop into ControlsButton.js
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
    //this variable changes the displayed text values for controls
    let controlSetToggle1 = this.state.controlSetToggle1;
    let controlSetToggle2 = this.state.controlSetToggle2;

    //default for unselected higlight of tab is 3px solid black 
    let controlsHighlightColor = '3px solid black';
    let notesHighlightColor = '3px solid black';

    //This tracks which tab should be highlighted, informing the user of current selection
    let highlightControls = this.state.highlightControls;
    let highlightNotes = this.state.highlightNotes;

    let controls = this.state.showControls;
    let notes = this.state.showNotes;

    //These are variables as they need changed based on state during each render
    let textP1;
    let textP2;
    let textNotes;
    //These buttons are rendered in the controls tab
    let keyBoardButtons;
    let gamePadButtons;

    //padding to center notes div
    let notesPageGridPadding;

    if (highlightControls){
        controlsHighlightColor = '3px Solid Green';
    }
    if (highlightNotes){
        notesHighlightColor = '3px Solid Green';
    }
    if (controls){
       
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
            Shield: I
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
            Shield: B
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
            Shield: NumPad 1
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
            Shield: B
            <br></br>
            Dodge: Right Bumper
            </p>
            </div>
         }
       
    }
    else if (notes){
        
        notesHighlightColor = '3px solid #1f39bd';
        notesPageGridPadding = <Grid item xs = {2}> </Grid>
        textNotes = <div style = {{paddingTop: 13}}><div style = {{ backgroundColor: '#9A9A9A', fontSize: 14, borderRadius: 15, color: 'black', border: '1px solid black'}}>
        <p><u>v0.0.1</u> <br></br> <b>Hello, and welcome to Mild Mayhem!</b> <br></br>The goal is simple, defeat your opponent! Use your lightning bolts and magic blasts. You can deflect the magic blasts with your sword and dodge through attacks.</p>
        </div>
        </div>
    }
    return <div style={{ paddingLeft: 20, paddingTop: 10, height: '100%'}}>
                <Grid container>
                    <Grid item xs = {6}>
                        <div onClick={this.showControls} onMouseEnter={this.toggleControlsHighlight} onMouseLeave={this.toggleControlsHighlight} style={{cursor: 'pointer', borderRadius: 15,backgroundColor: '#9A9A9A', textAlign: 'center', padding: 10, border: controlsHighlightColor}}>
                            Controls
                        </div>
                    </Grid>
                    <Grid item xs = {6}>
                        <div onClick={this.showNotes} onMouseEnter={this.toggleNotesHighlight} onMouseLeave={this.toggleNotesHighlight} style={{cursor: 'pointer', borderRadius: 15,backgroundColor: '#9A9A9A', textAlign: 'center',  padding: 10, border: notesHighlightColor}}>
                            Notes
                        </div>
                    </Grid>
                    
                </Grid>
               
                <div style={{backgroundColor: 'black', borderRadius: 15, textAlign: 'center', color: '#39FF14',verticalAlign: 'center', fontSize: 13,height:260, border: '4px solid black'}}>
                    <Grid container>
                        {/*These curly braced jsx values dissappear if they are not set in render, great for a changing info box values*/}
                        {notesPageGridPadding}
                        {keyBoardButtons}
                        <Grid item xs = {8}>
                            {textP1}
                            {textNotes}
                             {/*distance between control text*/}
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