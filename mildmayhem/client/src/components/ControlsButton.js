import React from 'react';
import ReactDOM from 'react-dom';
class ControlsButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {highlight: this.props.selected};
    }
    toggle = () => {
        //this.setState({highlight: !this.state.highlight});
        if(!this.props.selected){
            this.props.onClick(this.props.id);
        }
        
    };
    render() {
        let highlight = this.props.selected;
        let highlightColor = "3px Solid Black";
        if (highlight){
            highlightColor = "3px Solid Green";
        }
        return <div>
            <div style={{paddingTop: this.props.paddingTop}}></div>
            <div onClick = {this.toggle} style = {{border: highlightColor}}>
                    <img width="100%" src={this.props.image} alt="Game Room Image" /> 
            </div>
        </div>
    }
}
export default ControlsButton;