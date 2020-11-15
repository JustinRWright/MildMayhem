import React from 'react';
import ReactDOM from 'react-dom';
class ControlsButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {highlight: this.props.selected,
        hoverHighlight: false};
    }
    toggle = () => {
        //this.setState({highlight: !this.state.highlight});
        if(!this.props.selected){
            this.props.onClick(this.props.id);
        }
        
    };
    hoverToggle = () => {
        this.setState({hoverHighlight: !this.state.hoverHighlight});
    }
    render() {
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
            <div style={{paddingTop: this.props.paddingTop}}></div>
            <div onClick = {this.toggle} onMouseEnter={this.hoverToggle} onMouseLeave={this.hoverToggle} style = {{cursor: 'pointer', borderRadius: 2, border: highlightColor}}>
                    <img width="100%" src={this.props.image} alt="Game Room Image" /> 
            </div>
        </div>
    }
}
export default ControlsButton;