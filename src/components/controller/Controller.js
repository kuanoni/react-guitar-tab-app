import React from 'react';
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
		<div>
			<ClearColumnButton />
			<UndoButton />
			<MoveSelectionRightButton />
			<MoveSelectionLeftButton />
			<ChangeToDivider />
			<SpaceButton />
            <LineBreakButton />
            <DeleteBreakButton />
		</div>
	);
};

export default Controller;
