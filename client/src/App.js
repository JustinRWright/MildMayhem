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
  //callback function which comes all the way from the button component in the React application, without redux, 
  //I believe state has to be managed like this
  controlConfig = (dataFromMenuPage) => {
    this.setState({controlConfig: dataFromMenuPage});
  };
 
  render() {
    
    return (
      
      <Router>
        <div>
            <Switch>
              <Route path="/" exact >
                {/*Getting the control configuration from here*/}
                <MenuPage passControlConfig={this.controlConfig}/>
              </Route>
              <Route path="/game">
                {/*We are passing the control configuration into the game*/}
                <GamePage controlConfig={this.state.controlConfig}/>
              </Route>
            </Switch>
         
        </div>
      </Router>
      
    )
  }
}

export default App;
