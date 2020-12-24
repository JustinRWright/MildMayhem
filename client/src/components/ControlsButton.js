import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
const ControlsButton = (props) => {

  // const [highlight,setHighlight] = useState(props.selected)
  const [hoverHighlight,setHoverHighlight] = useState(false)
    // constructor(props) {
    //     super(props);
    //     this.state = {highlight: this.props.selected,
    //     hoverHighlight: false};
    // }
    //toggles 'selected' prop from parent component on click
    const toggle = () => {
        if(!props.selected){
            //calls function from parent componet prop that was passed in
            props.onClick(props.id);
        }
        
    };
    //highlight button on hover
    const hoverToggle = () => {
        setHoverHighlight(!hoverHighlight);
    }

    //Change highlight of button on render based on state
        let highlight = props.selected
        let highlightColor = "3px Solid Black";
        if (hoverHighlight){
            highlightColor = "3px Solid Green";
        }
        if (highlight){
            highlightColor = "4px Solid #1f39bd";
        }
        return <div>
            {/*set padding from parent*/}
            <div style={{paddingTop: props.paddingTop}}>
            </div>
            
            <div onClick = {toggle} onMouseEnter={hoverToggle} onMouseLeave={hoverToggle} style = {{cursor: 'pointer', borderRadius: 2, border: highlightColor}}>
                    <img width="100%" src={props.image} alt="Game Room Image" /> 
            </div>
        </div>
    
}
export default ControlsButton;