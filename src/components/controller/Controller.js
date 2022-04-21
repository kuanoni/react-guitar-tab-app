import React from 'react';
import './controller.scss'
import AddHammerOnButton from './AddHammerOnButton';
import AddPullOffButton from './AddPullOffButton';
import ChangeToDivider from './ChangeToDividerButton';
import ClearColumnButton from './ClearColumnButton';
import DeleteBreakButton from './DeleteBreakButton';
import LineBreakButton from './LineBreakButton';
import MoveSelectionLeftButton from './MoveSelectionLeftButton';
import MoveSelectionRightButton from './MoveSelectionRightButton';
import SpaceButton from './SpaceButton';
import UndoButton from './UndoButton';

const Controller = () => {
	return (
		<div className='controller'>
			<ClearColumnButton />
			<UndoButton />
			<MoveSelectionRightButton />
			<MoveSelectionLeftButton />
			<ChangeToDivider />
			<SpaceButton />
            <LineBreakButton />
            <DeleteBreakButton />
            <AddHammerOnButton />
            <AddPullOffButton />
		</div>
	);
};

export default Controller;
