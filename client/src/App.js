import React, {Component} from 'react';
import styles from './styles/main.css';
import MenuPage from './pages/MenuPage.js';
import GamePage from './pages/GamePage.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react';


class App extends Component {
 constructor(props) {
            super(props);
            //listens for a new online room creation
           

            //ControlConfig is a default value
            this.state = {controlConfig: {
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
            },
            gameConfig: 'offline',
            roomName: 'Null'
          }
          };
  //Callback function which comes all the way from the button component in the React application, without redux, 
  //I believe state has to be managed/updated like this, which I think it isn't the best way to do it
  //I forget the term but basically you have to pass this one callback function through the entire program if there
  // isn't a common parent component
  
  controlConfig = (dataFromMenuPage) => {
    this.setState({controlConfig: dataFromMenuPage});
  };
  gameConfig = (gameSelectionFromMenuPage,roomNameFromMenuPage) => {
    this.setState({gameConfig: gameSelectionFromMenuPage,roomName: roomNameFromMenuPage});

  }
  render() {
    
    return (
      
      <Router>
        <div>
            <Switch>
              <Route path="/" exact >
                {/*Getting the control configuration from here*/}
                <MenuPage passControlConfig={this.controlConfig} addNewRoom={this.addNewRoom} passGameConfig={this.gameConfig}/>
              </Route>
              <Route path="/game">
                {/*We are passing the control configuration into the game*/}
                <GamePage controlConfig={this.state.controlConfig} gameConfig={this.state.gameConfig} roomName={this.state.roomName}/>
              </Route>
            </Switch>
         
        </div>
      </Router>
      
    )
  }
}

export default App;
