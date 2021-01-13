import React from "react";
import { controlsAtom, keyBindingsAtom, controlConfigAtom } from "../jotai";
import { useAtom } from "jotai";
import styled from "styled-components";

// components with styles
const StyledControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 1.5rem;
    text-transform: uppercase;
  }

  .setControlsButton {
    cursor: pointer;
    background: gray;
    font-family: 'Audiowide', cursive;  
    border-radius: 6px;
    

    border-color: black;
    border: 3px solid;
  }
  .controls-option {
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5rem;

    .keyboard {
      margin: 0 2.2rem 0 0;
    }

    .gamepad {
      margin: 0 0 0 1.5rem;
    
    }

    button {
      width: 200px;
      
      outline: none;
      font-size: 1.6rem;
      font-weight: bold;
      cursor: pointer;
      background: gray;
      font-family: 'Audiowide', cursive;  
      border-radius: 6px;
      border-color: black;
      border: 3px solid;
    }

    button:hover {
      background-color: rgb(221,221,221);
    }
  }

  .controls-details {
    display: flex;
    flex-direction: column;
    align-items: center;

    .player-details {
      display: flex;
      align-items: center;

      .players {
        margin: 0 60px;
      }

      span {
        text-decoration: underline;
        font-size: 1.3rem;
      }
    }

  }
  .list-container {
    display: flex;
    align-items: center;
  }
`;
const KeyTitle = styled.span`
grid-area: title;
font-size: 1rem;
padding-left: 10px;
`;
const KeyValue = styled.span`
grid-area: value;
font-size: 1.15rem;
justify-self: center;
padding-left: 10px;

`;

const ListItem = styled.li`
display: grid;
grid-template: 'title value';
grid-template-columns: 105px 130px;
grid-template-rows: 26px;
list-style: none;
align-items: center;
padding: 3px 0;
`;

const List = styled.ul`
margin-left: 0;
padding-left: 0;
`;
// controls
const controlsList = [
  ["WASD", "SPACE", "O", "P", "I", "SHIFT"],
  ["ArrowKeys", "NumPad 0", "NumPad 8", "NumPad 9", "NumPad 1", "NumPad 4"],
  ["Left Stick", "X", "Right Trigger", "Left Trigger", "B", "Right Bumper"],
];

const Controls = () => {
  const [controlMode, setControlMode] = useAtom(controlsAtom);
  const [keyBindings, setKeyBindings] = useAtom(keyBindingsAtom);
  const [controlConfig, setControlConfig] = useAtom(controlConfigAtom);
  const toggleControl = (e) => {
    if(e.target.innerText.toLowerCase() === controlMode.toLowerCase()) {
      return
    }
    if (controlMode === "keyboard") {
      setControlConfig({player1: {
      Movement: 'WASD',
      SwordSlash: 'SPACE',
      MagicBlast: 'P'
    },
    player2: {
      Movement: 'ArrowKeys',
      SwordSlash: 'NumPad0',
      MagicBlast: 'NumPad9'
    }});
      //setControlMode("gamepad");
      //setKeyBindings(false);
    } else {
      setControlConfig({ player1: {
          Movement: 'GamePad',
          SwordSlash: '',
          MagicBlast: ''
        },player2: {
          Movement: 'ArrowKeys',
          SwordSlash: 'NumPad0',
          MagicBlast: 'NumPad9'
        }});
      //setControlMode("keyboard");
      //setKeyBindings(true);
    }
  };
  // displays keys
  const mapKeys = (item) => {
    return (
      <div className="list-container">
        <List>
          <ListItem>
            <KeyTitle>Movement</KeyTitle>
            <KeyValue>{item[0][0]}</KeyValue>
          </ListItem>
          <ListItem>
            <KeyTitle>Sword Slash</KeyTitle>
            <KeyValue>{item[0][1]}</KeyValue>
          </ListItem>
          <ListItem>
            <KeyTitle>Magic Blast</KeyTitle>
            <KeyValue>{item[0][2]}</KeyValue>
          </ListItem>
          <ListItem>
            <KeyTitle>Lightning</KeyTitle>
            <KeyValue>{item[0][3]}</KeyValue>
          </ListItem>
          <ListItem>
            <KeyTitle>Shield</KeyTitle>
            <KeyValue>{item[0][4]}</KeyValue>
          </ListItem>
          <ListItem>
            <KeyTitle>Dodge</KeyTitle>
            <KeyValue>{item[0][5]}</KeyValue>
          </ListItem>
        </List>
        {item.length > 1 && (
          <List >
            <ListItem>
              <KeyTitle>Movement</KeyTitle>
              <KeyValue>{item[1][0]}</KeyValue>
            </ListItem>
            <ListItem>
              <KeyTitle>Sword Slash</KeyTitle>
              <KeyValue>{item[1][1]}</KeyValue>
            </ListItem>
            <ListItem>
              <KeyTitle>Magic Blast</KeyTitle>
              <KeyValue>{item[1][2]}</KeyValue>
            </ListItem>
            <ListItem>
              <KeyTitle>Lightning</KeyTitle>
              <KeyValue>{item[1][3]}</KeyValue>
            </ListItem>
            <ListItem>
              <KeyTitle>Shield</KeyTitle>
              <KeyValue>{item[1][4]}</KeyValue>
            </ListItem>
            <ListItem>
              <KeyTitle>Dodge</KeyTitle>
              <KeyValue>{item[1][5]}</KeyValue>
            </ListItem>
          </List>
        )}
      </div>
    );
  };

  return (
    <StyledControls>
      <h2>Controls</h2>
      <div className="controls-option">
        <button onClick={toggleControl} className="keyboard">
          Keyboard
        </button>
        <button onClick={toggleControl} className="gamepad">
          Gamepad
        </button>
      </div>
      <div className="controls-details">
        <div className="player-details">
          {controlMode === "keyboard" ? (
            <>
              <span className="players">Player 1</span>
              <span className="players">Player 2</span>
            </>
          ) : (
              <span>All players</span>
            )}
        </div>
        <div className="key-bindings">
          {keyBindings
            ? mapKeys(controlsList.slice(0, 2))
            : mapKeys(controlsList.slice(2))}
        </div>
      </div>
    </StyledControls>
  );
};

export default Controls;
