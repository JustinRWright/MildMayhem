import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/main.scss';

const MenuTabButton = (props) => {
    const toggle = () => {
        props.onClick();
    };
        let highlightColor;
        if (props.selected){
            highlightColor = "#00FFFF";
        }
        else {
            highlightColor = "black";
        }
        return <div>
            <div onClick={toggle} className="menuTabButton" style = {{paddingTop: 7, paddingBottom: 7, textAlign: 'center', margin: 'auto', backgroundColor: 'grey', width: '70%', cursor: 'pointer', borderRadius: 5, border: ("2px solid "+ highlightColor)}}>
                {props.title}
            </div>
        </div>
    
}
export default MenuTabButton;