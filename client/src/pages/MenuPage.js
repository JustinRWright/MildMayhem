import React, { useCallback } from 'react';
import { useAtom } from 'jotai';
import { displayModeAtom, roomsAtom } from '../jotai';
import '../styles/main.scss';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MatchRoomBox from '../components/MatchRoomBox.js';
import InfoMenuBox from '../components/InfoMenuBox.js';
import DisplayBox from '../components/DisplayBox'
import LocalGameImage from '../images/GameShot5.png';
import OnlineGameImage from '../images/OnlineGame.png';
import { Link } from 'react-router-dom';
import { subscribeToShowRooms, socket, getRooms, joinRoom } from '../api';
import { useState, useEffect } from 'react';
import MenuTabButton from '../components/menuTabButton.js';
import CssBaseline from '@material-ui/core/CssBaseline';
//import TestImage from '../images/VanGogh.png';
//import TestImage from '../images/DeepArted.jpg';
import TestImage from '../images/DeepArtedBC.jpg';
//import TestImage from '../images/DeepArtedBC2.jpg';
//import TestImage from '../images/DeepArtedG.jpg';
//import TestImage from '../images/DeepArtedGCY.jpg';
const styles = {
  menuTabButton: {
    padding: '16px 0px 16px 0px',
    paddingTop: 7,
    paddingBottom: 7,
    textAlign: 'center',
    margin: 'auto',
    backgroundColor: 'grey',
    width: '70%',
    cursor: 'pointer',
    borderRadius: 5,
    border: "3px solid black",
    '& a:hover': {
      border: "3px solid green",
    }
  }

};
const MenuPage = (props) => {
  const [displayMode, setDisplayMode] = useAtom(displayModeAtom);
  const [menuTabButtonSelection, setMenuTabButtonSelection] = useState({
    LocalPVP: true,
    OnlinePVP: false,
    Stats: false,
    Controls: false,
    Tutorial: false,
    Notes: false,
  });
  const updateDisplayMode = useCallback((DisplayModeString) => {
    console.log("displayModeStringis: " + DisplayModeString);

    let newSelection = {
    LocalPVP: false,
    OnlinePVP: false,
    Stats: false,
    Controls: false,
    Tutorial: false,
    Notes: false
    }
   
    newSelection[DisplayModeString] = true;
    //console.log('newSelection is: ' + JSON.stringify(newSelection));
    setMenuTabButtonSelection(() => newSelection);

    setDisplayMode(() => DisplayModeString);

  }, [ setDisplayMode ]);


  const [rooms, setRooms] = useAtom(roomsAtom)
  const [controls, setControls] = useState({
    player1: {
      Movement: 'WASD',
      SwordSlash: 'SPACE',
      MagicBlast: 'P'
    },
    player2: {
      Movement: 'ArrowKeys',
      SwordSlash: 'NumPad0',
      MagicBlast: 'NumPad9'
    }
  })
  //   this.state = {
  //     rooms: {},
  //     controls: {
  //       player1: {
  //         Movement: 'WASD',
  //         SwordSlash: 'SPACE',
  //         MagicBlast: 'P'
  //       },
  //       player2: {
  //         Movement: 'ArrowKeys',
  //         SwordSlash: 'NumPad0',
  //         MagicBlast: 'NumPad9'
  //       }
  //     }
  //   };
  // };
  useEffect(() => {
    //Remove event listeners in case user pressed back from online game

    //Whenever the rooms on the server are updated, the room state is set again
    subscribeToShowRooms((err, room) => {
      console.log("showRooms called was received in menupage")
      let newRooms = room;
      setRooms(newRooms);
    });
  }, [setRooms])

  useEffect(() => {
    return () => {
      socket.removeAllListeners()
    }
  }, [])
  
  // redundant code

  // const setRoomState = (newRooms) => {
  //   setRooms(newRooms)
  // }

  /*Function passed into the infoMenuBox, Sets the control config object which then gets passed up to App.js and then down into the GamePage component and the phaser game 
  Perhaps custom controls here can detect keycodes and translate directly into a keycode value that gets passed into phaser
  For example, an option to click on swordslash and press a key to get the key code(ex: SPACE), then send that to the phaser game where it will
  be set as the attack.*/
  const controlConfigSelected = (controlConfig) => {
    if (controlConfig === "keyboard1") {
      setControls({
        player1: {
          Movement: 'WASD',
          SwordSlash: 'SPACE',
          MagicBlast: 'P'
        },
        player2: controls.player2
      });
    }
    else if (controlConfig === "keyboard2") {
      setControls({
        player1: controls.player1,
        player2: {
          Movement: 'ArrowKeys',
          SwordSlash: 'NumPad0',
          MagicBlast: 'NumPad9'
        },
      });
    }
    else if (controlConfig === "gamepad1") {
      setControls({
        player1: {
          Movement: 'GamePad',
          SwordSlash: '',
          MagicBlast: ''
        },
        player2: controls.player2

      });
    }
    else if (controlConfig === "gamepad2") {
      setControls({
        player1: controls.player1,
        player2: {
          Movement: 'GamePad',
          SwordSlash: '',
          MagicBlast: ''
        },
      });
    }
  };
  //When a match room is clicked, the control config is passed to the game for the game start
  const matchRoomClicked = (gameType, roomName, playerId) => {
    if (gameType === 'joinOnline') {
      joinRoom(playerId);
    }

    props.passGameConfig(gameType, roomName);
    props.passControlConfig(controls);
    console.log('room created')
  };

  let roomCount = rooms;

  let joinMatchBox;

  //I set the resolution to 800*600, which is the size of an old school NewGrounds web game. It is currently not responsive
  //This could be changed for a mobile depoloyment or something
  return (
    <div style={{ backgroundImage: `url(${TestImage})`,  backgroundSize: '100% 100%', borderRadius: 15, maxWidth: 800, minWidth: 800, minHeight: 600, maxHeight: 600, margin: 'auto' }}>
      {/* for border box */}
      <CssBaseline />
      <Grid container style={{ height: '600px' }}>
        {/*Title Bar*/}
        <Grid item xs={12}>
          <div style={{ textAlign: 'center', borderRadius: 15, background: 'rgba(0, 0, 0, 0.6)', fontSize: 40, fontFamily: 'Audiowide', padding: 20, }}>
            <div style={{ color: '#39FF14' }}>
              <u>
                Mild Mayhem
                    </u>
            </div>

          </div>
        </Grid>
        {/*Interactive information box*/}
        <Grid item xs={12} container style={{ padding: '60px 0',height: '510px' }}>
          <Grid item xs={4}>
            <div>
              <MenuTabButton selected={menuTabButtonSelection.LocalPVP} onClick={() => updateDisplayMode("LocalPVP")} title="Local PVP"></MenuTabButton>
              <MenuTabButton selected={menuTabButtonSelection.OnlinePVP} onClick={() => updateDisplayMode("OnlinePVP")} title="Online PVP"></MenuTabButton>
              <MenuTabButton selected={menuTabButtonSelection.Stats} onClick={() => updateDisplayMode("Stats")} title="Stats"></MenuTabButton>
              <MenuTabButton selected={menuTabButtonSelection.Controls} onClick={() => updateDisplayMode("Controls")} title="Controls"></MenuTabButton>
              <MenuTabButton selected={menuTabButtonSelection.Tutorial} onClick={() => updateDisplayMode("Tutorial")} title="Tutorial"></MenuTabButton>
              <MenuTabButton selected={menuTabButtonSelection.Notes} onClick={() => updateDisplayMode("Notes")} title="Notes"></MenuTabButton>
            </div>
            {/* <div>
              <MenuTabButton  title="Local PVP"></MenuTabButton>
              <MenuTabButton  title="Online PVP"></MenuTabButton>
              <MenuTabButton  title="Stats"></MenuTabButton>
              <MenuTabButton  title="Controls"></MenuTabButton>
              <MenuTabButton  title="Tutorial"></MenuTabButton>
              <MenuTabButton  title="Notes"></MenuTabButton>
            </div> */}
            {/*<InfoMenuBox setControlConfig={controlConfigSelected}></InfoMenuBox>
          */}

          </Grid>

          {/*Online match box*/}

            {/*
          <div style={{ paddingTop: 40, paddingBottom: 30 }}>
            <Link to='/game' style={{ color: 'black' }}>
              <MatchRoomBox onClick={() => matchRoomClicked('createOnline')} image={OnlineGameImage} matchType={'Start Online Room'}></MatchRoomBox>
            </Link>
            
          </div>
          <div style={{ textAlign: 'center', paddingTop: 25, font: 25, color: '#39FF14' }}>
            <b>Available Online Matches</b>
          </div>
          */}

          {/* display box */}
          <Grid item xs={8} >
            <DisplayBox matchRoomClicked={matchRoomClicked}/>
          </Grid>


        </Grid>
        {/*Offline match box*/}
        {/* <Grid item xs={4}> */}
        {/* <div style={{ paddingTop: 40, paddingBottom: 30 }}>
            {/*route to game
            <Link to='/game' style={{ color: 'black' }}>
              <MatchRoomBox onClick={() => matchRoomClicked('offline')} image={LocalGameImage} matchType={'Start Local Room'}></MatchRoomBox>
            </Link>
          </div>
          */}
        {/* </Grid> */}
        {/* 
        {/*List of available online rooms
        <Grid item xs={1}>
        </Grid>

        <Grid item xs={10}>


          <div style={{ borderRadius: 15, backgroundColor: '#9A9A9A', align: 'left', textAlign: 'left', minHeight: 200, maxHeight: 200, border: '1px solid' }}>
            <Grid container>
              {

                Object.keys(roomCount).map((room, index) => (
                  <Grid item xs={4}>
                    <Link to='/game' style={{ color: 'black' }}>
                      <MatchRoomBox key={roomCount[room].id} onClick={() => matchRoomClicked('joinOnline', roomCount[room].name, roomCount[room].id)} image={LocalGameImage} matchType={roomCount[room].name}></MatchRoomBox>
                    </Link>
                  </Grid>
                ))


              }
            </Grid>

          </div>
        </Grid>

        <Grid item xs={1}>
        </Grid>
      */}
      </Grid>

    </div>)

}

export default MenuPage;