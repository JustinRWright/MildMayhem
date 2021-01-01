import React from 'react'
import Grid from '@material-ui/core/Grid'

const Notes = () => {
  return (
    <div >
      <div style={{ lineHeight: '1.5rem' }}>
        <div style={{ textAlign: 'center' }}><u><b>Patch Notes/Updates</b></u></div>

        <div style={{ paddingLeft: 27, width: '80%', textAlign: 'left' }}>
          <p><b style={{ display: 'inline-block', marginBottom: '1rem' }}>Hello, and welcome to Mild Mayhem!</b>
            <br></br>The goal is simple, defeat your opponent! Use your lightning bolts and magic blasts. You can deflect the magic blasts with your sword and dodge through attacks.
            </p>

        </div>
      </div>
    </div>
  )
}

export default Notes