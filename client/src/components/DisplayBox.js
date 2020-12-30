import React from 'react'
import { useAtom } from 'jotai'
import { displayModeAtom } from '../jotai'
import Notes from './Notes'

const DisplayBox = () => {
  const [displayMode, setDisplayMode] = useAtom(displayModeAtom)

  return (
    <div className="display-container">
      {!displayMode
        ? <Notes />
        : <div>{displayMode}</div>
      }
    </div>
  )
}
export default DisplayBox