import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/main.scss';
import BrickImage from '../images/ImpressionistBrickButtonG.jpg';
import SwordMarker from '../images/SwordMarker.png';
const MenuTabButton = (props) => {
    const toggle = () => {
        props.onClick();
    };
        let highlightColor;
        let swordMarker;
        let underline = 'none';
        if (props.selected){
            highlightColor = "#005cff";
            underline = 'underline';
            swordMarker = <img style={{backgroundSize: 'cover', height: 30, position: 'absolute', top: 4, left: 10}} src={SwordMarker} alt="this is car image" />;
        }
        else {
            highlightColor = "black";
            swordMarker = <div></div>
        }
        return <div>
            <div onClick={toggle} className="menuTabButton" style = {{ position: 'relative', textAlign: 'center', margin: 'auto', height: 39.5, backgroundColor: 'grey', width: '70%', cursor: 'pointer', borderRadius: 3, border: (".2px solid "+ highlightColor)}}>
                <img style={{backgroundSize: 'cover', opacity: .3, position: 'relative', width: '100%', top: 0, left: 0}} src={BrickImage} alt="this is car image" />
                {swordMarker}
                <div style={{fontSize: 20, textDecoration: underline, fontFamily: 'Audiowide', position: 'absolute', textAlign: 'center', top: 4, left: 38}}>
                
                {props.title}
                </div>
                
            </div>
        </div>
    
}
export default MenuTabButton;