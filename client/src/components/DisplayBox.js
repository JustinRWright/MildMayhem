import React from 'react'
import { useAtom } from 'jotai'
import { displayModeAtom } from '../jotai'
import Notes from './Notes'
import LocalPVP from './LocalPVP'
import OnlinePVP from './OnlinePVP'
import Controls from './Controls'
const DisplayBox = ({matchRoomClicked}) => {
  const [displayMode, setDisplayMode] = useAtom(displayModeAtom)

  const displayContent = (displayMode) => {
    switch(displayMode) {
      case 'LocalPVP': return (<LocalPVP />)

      case 'OnlinePVP': return (<OnlinePVP matchRoomClicked={matchRoomClicked}/>)

      case 'Stats': return displayMode

      case 'Controls': return (<Controls />)

      case 'Tutorial': return displayMode

       case 'Notes': return (<Notes />)

      default: return (<LocalPVP />)
    }
  }

  return (
    <div className="display-container">
      { displayContent(displayMode) }
    </div>
  )
}
export default DisplayBox