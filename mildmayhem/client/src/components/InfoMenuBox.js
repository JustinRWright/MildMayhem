import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';

class InfoMenuBox extends React.Component {
  constructor(props) {
            super(props);
            this.state = {showControls: true,
            showStats: true}; 
            
        }
    
    showStats = () => {
      this.setState({showControls: false, showStats: true});

    }
    showControls = () => {
      this.setState({showControls: true, showStats: false});

    }
  render() {
    let controls = this.state.showControls;
    let stats = this.state.showStats;
    let text;
    let controlColor = '#FFFFFF';
    let statColor = '#FFFFFF';
    if (controls){
        controlColor = '#9A9A9A';
        text = <p>Welcome to Mild Mayhem!!<br></br><br></br><div style = {{border: '1px solid'}}><u>Player1
        </u><br></br>Movement: WASD<br></br>
        Sword Slash: SPACE<br></br>
        Magic Blast: P
        <br></br>
        </div>
        <div style = {{border: '1px solid'}}>
        <u>Player2
        </u><br></br>Movement: ArrowKeys<br></br>
        Sword Slash: NumPad 0<br></br>
        Magic Blast: NumPad 9
        </div>
        </p>
       
    }
    else if (stats){
        statColor = '#9A9A9A';
        text = <p><br></br>So how's it goin'?<br></br><br></br>Wins: 0<br></br><br></br> Losses: 0<br></br><br></br> Perfect Wins: 0</p>
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
                <div style={{textAlign: 'center', verticalAlign: 'middle', height:200, paddingBottom: 60, border: '1px solid'}}>
                    {text}
                </div>
                
            </div>
}
}

export default InfoMenuBox;