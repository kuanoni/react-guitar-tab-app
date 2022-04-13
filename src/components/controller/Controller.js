import React from 'react'
import AddHammerOnButton from './AddHammerOnButton'
import ChangeToDivider from './ChangeToDividerButton'
import ClearColumnButton from './ClearColumnButton'
import MoveSelectionLeftButton from './MoveSelectionLeftButton'
import MoveSelectionRightButton from './MoveSelectionRightButton'
import UndoButton from './UndoButton'

const Controller = () => {
  return (
    <div>
        <ClearColumnButton />
        <UndoButton />
        <MoveSelectionRightButton />
        <MoveSelectionLeftButton />
        <ChangeToDivider />
    </div>
  )
}

export default Controller