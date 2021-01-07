import React, { Component, useState } from 'react';
import styles from './styles/main.css';
import MenuPage from './pages/MenuPage.js';
import GamePage from './pages/GamePage.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Phaser from 'phaser'
import { useAtom, atom } from 'jotai'
import { IonPhaser } from '@ion-phaser/react';
import { matchAtom, controlConfigAtom } from './jotai'

const App = () => {
  // constructor(props) {
  //   super(props);
  //listens for a new online room creation


  //ControlConfig is a default value
  //   this.state = {
  //     controlConfig: {
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
  //     },
  //     gameConfig: 'offline',
  //     roomName: 'Null'
  //   }
  // };
  /*
  const [controlConfig, setControlConfig] = useState({
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
  */
  const [match, setMatch] = useAtom(matchAtom);
  const [gameConfig, setGameConfig] = useState('offline');
  const [roomName, setRoomName] = useState('Null');
  const [controlConfig, setControlConfig] = useAtom(controlConfigAtom);
  //Callback function which comes all the way from the button component in the React application, without redux, 
  //I believe state has to be managed/updated like this, which I think it isn't the best way to do it
  //I forget the term but basically you have to pass this one callback function through the entire program if there
  // isn't a common parent component

  // controlConfig = (dataFromMenuPage) => {
  //   this.setState({ controlConfig: dataFromMenuPage });
  // };
  // gameConfig = (gameSelectionFromMenuPage, roomNameFromMenuPage) => {
  //   this.setState({ gameConfig: gameSelectionFromMenuPage, roomName: roomNameFromMenuPage });

  // }

  /*const controlConfigHandler = (dataFromMenuPage) => {
    setControlConfig(dataFromMenuPage);
  };
  const gameConfigHandler = (gameSelectionFromMenuPage, roomNameFromMenuPage) => {
    setGameConfig(gameSelectionFromMenuPage)
    setRoomName(roomNameFromMenuPage)
  }
  */


  return (
    
    <Router>
      <div>
        <Switch>
          <Route path="/" exact >\
           
            {/*Getting the control configuration from here*/}
            {/* <MenuPage passControlConfig={controlConfigHandler} addNewRoom={this.addNewRoom} passGameConfig={gameConfigHandler} /> */}
            <MenuPage />
          </Route>
          <Route path="/game">
           {console.log('matchAtom is: ' + JSON.stringify(match))}
            {/*We are passing the control configuration into the game*/}
            <GamePage controlConfig={controlConfig} gameConfig={match.gameType} roomName={match.roomName} />
          </Route>
          <Route path="/tutorial">
            <GamePage controlConfig={controlConfig} gameConfig={'tutorial'} roomName={match.roomName} />
          </Route>
        </Switch>

      </div>
    </Router>

  )

}

export default App;
