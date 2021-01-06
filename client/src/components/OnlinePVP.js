import React,{ useRef, useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAtom } from 'jotai'
import { roomsAtom, matchAtom } from '../jotai'
import Room from './Room'
import styled from 'styled-components'
import { joinRoom } from '../api';

const StyledOnlinePVPContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  .button-container {
    position: relative;
    width: 100%;
    text-align: center;
    margin: 0;
  }

  .createRoom-button{
    margin: 1.4rem auto;
    padding: 0.8rem 1.2rem;
    font-size: 1.1rem;
    border-radius: 25px;
    outline: none;
    cursor: pointer;

    &:hover {
      background-color: rgb(221,221,221)
    }
  }
  .border-elem {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 85%;
    margin: 0 auto;
    border-bottom: 2px solid rgb(79,79,79);
  }

  .roomlist-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .roomlist-title {
      margin-bottom: 0;
      font-size: 1.1rem;
    }

    .roomlist {
      width: 100%;
      padding: 0 1rem 1rem;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

  }
`
const OnlinePVP = ({ matchRoomClicked }) => {
  const isPvpClicked = useRef(false);
  const history = useHistory();
  const [rooms, setRooms] = useAtom(roomsAtom);
  const [match, setMatch] = useAtom(matchAtom);
 
  useEffect(() => {
    //Wait for rerender to navigate so that Jotai updates necessary states before navigation
    if (isPvpClicked.current){
      //go to game
     history.push("/game")
    }
  });
 
  const startMatch = (gameType, roomName, roomId) => {
    setMatch({gameType: gameType, roomName: roomName, roomId: roomId});
   
    isPvpClicked.current = true;
    joinRoom(roomId);
  }
  const createRoom = () => {
    setMatch({gameType: 'createOnline', roomName: '', roomId: ''});
    
    isPvpClicked.current = true;
   
  }
 
  return (
    <StyledOnlinePVPContainer>
      <div className="button-container">
        <div style={{ color: 'black' }}>
          <button onClick={createRoom} className="createRoom-button">Create Room</button>
        </div>
        <div className="border-elem"></div>
      </div>
      <div className="roomlist-container">
        <p className="roomlist-title">Available Online rooms</p>
        <div className="roomlist">
          {
            Object.keys(rooms).length
              ? Object.keys(rooms).map((room, index) => {
               return <div style={{textDecoration:'none'}}>
                  <Room key={rooms[room].id} room={rooms[room]} onClick={() => startMatch('joinOnline', rooms[room].name, rooms[room].id)} />
                </div>
              })
              : <p>It Seems there are no rooms available. How about creating your own room? Click the <b>Create Room</b> Button Above.
          </p>
          }
        </div>
      </div>
    </StyledOnlinePVPContainer>

  )
}

export default OnlinePVP

// Object.keys(roomCount).map((room, index) => (
//   <Grid item xs={4}>
//     <Link to='/game' style={{ color: 'black' }}>
//       <MatchRoomBox key={roomCount[room].id} onClick={() => matchRoomClicked('joinOnline', roomCount[room].name, roomCount[room].id)} image={LocalGameImage} matchType={roomCount[room].name}></MatchRoomBox>
//     </Link>
//   </Grid>