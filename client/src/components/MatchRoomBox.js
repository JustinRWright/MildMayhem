import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const MatchRoomBox = (props) => {
  const [highlight,setHighlight] = useState(false)
  // constructor(props) {
  //           super(props);
  //           this.state = {highlight: false}
  //           };
    //Highlights object
    const toggleHighlight = () => {
      setHighlight(!highlight);
    }

    // let highlightCSS = highlight;
    let highlightColor;
    
    if (highlight){
      highlightColor = "3px Solid Green";
    }
    else {
      highlightColor = "3px Solid Black";
    }
    return <div  onClick = {props.onClick} onMouseEnter={toggleHighlight} onMouseLeave={toggleHighlight}
     style={{border: highlightColor,
      cursor:'pointer', textAlign: 'center', borderRadius: 15, width: 200, height: 200, margin: 'auto', backgroundColor: '#9A9A9A'}}>
              <div>{props.matchType}</div>
              <div style={{border: '1px solid', width: '100%', height: 160}}>
                <img width="100%" height="100%" src={props.image} alt="Game Room Image" /> 
              </div>
          </div>
        

}

export default MatchRoomBox;