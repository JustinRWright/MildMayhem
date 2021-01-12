import React, { useRef, useEffect, useState} from 'react'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { Link, useHistory } from 'react-router-dom'
import { matchAtom } from '../jotai'

const StyledTutorialContainer = styled.div`


  .button__container:hover {
      background: rgb(95, 95, 95);
  }
  
`
const Tutorial = () => {
    const isTutorialClicked = useRef(false);
    const history = useHistory();
    const [match, setMatch] = useAtom(matchAtom);
 useEffect(()=>{
     //if (isTutorialClicked.current){
     //history.push("/tutorial");    
     //}
 });
 const startTutorial = () => {
        history.push("/tutorial");
        //isTutorialClicked.current = true;
        //setMatch({gameType: 'tutorial', roomName: '', roomId: ''});
    };


  return (
    <StyledTutorialContainer>
        <div style={{paddingTop: '30%'}}>
            <div onClick={startTutorial} className='button__container' style={{ cursor: 'pointer', border: '2px solid black', textAlign: 'center', borderRadius: 15, fontSize: 40, fontFamily: 'Audiowide', }}>
            Start Tutorial
            </div>
        </div>
    </StyledTutorialContainer>
  )
}

export default Tutorial;