import React, {Component} from 'react';
import styles from './styles/main.css';
import MenuPage from './pages/MenuPage.js';
import GamePage from './pages/GamePage.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react';
class App extends Component {
 
 
  render() {
    
    return (
      
      <Router>
        <div>
        <Route path="/" exact component={MenuPage} />
        <Route path="/game" component={GamePage} />
      
        </div>
      </Router>
      
    )
  }
}

export default App;
