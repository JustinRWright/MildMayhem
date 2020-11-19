import React, {Component} from 'react';
import styles from './styles/main.css';
import MenuPage from './pages/MenuPage.js';
import GamePage from './pages/GamePage.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react';
const ENDPOINT = "http://127.0.0.1:5000";

class App extends Component {
 constructor(props) {
            super(props);
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
            }
          }
          };
  controlConfig = (dataFromMenuPage) => {
    console.log("controls data from MenuPage is: " + dataFromMenuPage);
    this.setState({controlConfig: dataFromMenuPage});
    console.log("state is now: " + JSON.stringify(this.state.controlConfig));
  };
 
  render() {
    
    return (
      
      <Router>
        <div>
            <Switch>
              <Route path="/" exact >
                <MenuPage passControlConfig={this.controlConfig}/>
              </Route>
              <Route path="/game">
                <GamePage controlConfig={this.state.controlConfig}/>
              </Route>
            </Switch>
         
        </div>
      </Router>
      
    )
  }
}

export default App;
