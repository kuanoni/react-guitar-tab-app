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
			<UndoButton /> 
			<MoveSelectionLeftButton /> 
			<MoveSelectionRightButton />
            <AddHammerOnButton />
            <AddPullOffButton />
			<ClearColumnButton /> 
			<ChangeToDivider />
			<SpaceButton /> 
            <LineBreakButton /> 
            <DeleteBreakButton />
		</div>
	);
};

export default Controller;

















// add box shadow under tab strip
// tab font color to grey
// controller button label on hover
// 