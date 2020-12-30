import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/main.scss';

const menuTabButton = (props) => {
        return <div>
            <div onClick={props.onClick} className="menuTabButton" style = {{paddingTop: 7, paddingBottom: 7, textAlign: 'center', margin: 'auto', backgroundColor: 'grey', width: '70%', cursor: 'pointer', borderRadius: 5, border: "3px solid black"}}>
                {props.title}
            </div>
        </div>
    
}
export default menuTabButton;