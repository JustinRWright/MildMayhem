import React from 'react'
import LocalGameImage from '../images/GameShot5.png';
import styled from 'styled-components'

const StyledRoomContainer = styled.div`
display: flex;
padding: 0.5em 1em;

border: 2px solid black;
margin: 1rem 0 0 1rem;
border-radius: 15px;
align-items: center;

  .item__image-container {
    height: 50px;
    width: 50px;
    overflow: hidden;
    cursor: pointer;
    border-radius: 50%;

    .item__image {
      height: 50px;
      width: 50px;
    }
  }

  .item__name {
    margin: 0 1rem;
    font-size: 1.1rem;
    text-transform: uppercase;
  }
`

const Room = ({ room, onClick }) => {
  console.log(room)
  return (
    <StyledRoomContainer onClick={onClick}>
      <div className="item__image-container">
        <img className="item__image" src={LocalGameImage} alt="in-game" />
      </div>
      <div className="item__name">{room.name}</div>
    </StyledRoomContainer>
  )
}

export default Room