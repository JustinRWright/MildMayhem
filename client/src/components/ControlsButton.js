import React from 'react';
import ReactDOM from 'react-dom';
class ControlsButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {highlight: this.props.selected,
        hoverHighlight: false};
    }
    //toggles 'selected' prop from parent component on click
    toggle = () => {
        if(!this.props.selected){
            //calls function from parent componet prop that was passed in
            this.props.onClick(this.props.id);
        }
        
    };
    //highlight button on hover
    hoverToggle = () => {
        this.setState({hoverHighlight: !this.state.hoverHighlight});
    }
    render() {
        //Change highlight of button on render based on state
        let highlight = this.props.selected;
        let highlightColor = "3px Solid Black";
        let hoverHighlight = this.state.hoverHighlight;
        if (hoverHighlight){
            highlightColor = "3px Solid Green";
        }
        if (highlight){
            highlightColor = "4px Solid #1f39bd";
        }
        return <div>
            {/*set padding from parent*/}
            <div style={{paddingTop: this.props.paddingTop}}>
            </div>
            
            <div onClick = {this.toggle} onMouseEnter={this.hoverToggle} onMouseLeave={this.hoverToggle} style = {{cursor: 'pointer', borderRadius: 2, border: highlightColor}}>
                    <img width="100%" src={this.props.image} alt="Game Room Image" /> 
            </div>
        </div>
    }
}
export default ControlsButton;