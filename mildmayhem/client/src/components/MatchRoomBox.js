import React from 'react';
import ReactDOM from 'react-dom';

class MatchRoomBox extends React.Component {
  constructor(props) {
            super(props);
            this.state = {highlight: false}
            };
        
    toggleHighlight = () => {
      this.setState({highlight: !this.state.highlight});
      console.log("highlight Toggled");
    }
  render() {
    let highlightCSS = this.state.highlight;
    let highlightColor;
    if (highlightCSS){
      highlightColor = "3px Solid Green";
    }
    else {
      highlightColor = "3px Solid Black";
    }
    return <div onMouseEnter={this.toggleHighlight} onMouseLeave={this.toggleHighlight}
     style={{border: highlightColor,
      textAlign: 'center', width: 200, height: 200, margin: 'auto'}}>
              <div>{this.props.matchType}</div>
              <div style={{border: '1px solid', width: '100%', height: 160}}>
                <img width="100%" height="100%" src={this.props.image} alt="Game Room Image" /> 
              </div>
          </div>
        
}
}

export default MatchRoomBox;