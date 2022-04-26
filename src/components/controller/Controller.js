import React from 'react';
import './controller.scss';
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
import AddBendButton from './AddBendButton';
import AddSlideDownButton from './AddSlideDownButton';
import AddSlideUpButton from './AddSlideUpButton';
import AddGhostNoteButton from './AddGhostNoteButton';
import AddNaturalHarmonicButton from './AddNaturalHarmonicButton';

const Controller = () => {
	return (
		<div className='controller-wrapper'>
			<div className='controller'>
				<UndoButton />
				<MoveSelectionLeftButton />
				<MoveSelectionRightButton />
				<AddHammerOnButton />
				<AddPullOffButton />
				<AddBendButton />
				<AddSlideUpButton />
				<AddSlideDownButton />
                <AddGhostNoteButton />
                <AddNaturalHarmonicButton />
				<ClearColumnButton />
				<ChangeToDivider />
				<SpaceButton />
				<LineBreakButton />
				<DeleteBreakButton />
			</div>
		</div>
	);
};

export default Controller;