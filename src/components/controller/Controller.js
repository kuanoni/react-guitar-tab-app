import React, { useState } from 'react';
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
import SelectChordDropdown from './SelectChordDropdown';
import PlaceChordButton from './PlaceChordButton';
import SaveSelectedChordButton from './SaveSelectedChordButton';
import AddMutedButton from './AddMutedButton';
import PalmMuteButton from './PalmMuteButton';
import VibratoButton from './VibratoButton';
import DeleteModifierButton from './DeleteModifierButton';

const Controller = () => {
	const [selectedChord, setSelectedChord] = useState('');

	return (
		<div className='controller-wrapper'>
			<div className='controller'>
				<MoveSelectionLeftButton />
				<MoveSelectionRightButton />
				<UndoButton />
				<div className='divider'></div>
				<AddHammerOnButton />
				<AddPullOffButton />
                <AddMutedButton />
				<AddBendButton />
				<AddSlideUpButton />
				<AddSlideDownButton />
				<AddGhostNoteButton />
				<AddNaturalHarmonicButton />
				<div className='divider'></div>
                <PalmMuteButton />
                <VibratoButton />
                <DeleteModifierButton />
				<div className='divider'></div>
				<ClearColumnButton />
				<ChangeToDivider />
				<SpaceButton />
				<LineBreakButton />
				<DeleteBreakButton />
				<div className='divider'></div>
				<SelectChordDropdown setSelectedChord={setSelectedChord} />
				<PlaceChordButton selectedChord={selectedChord} />
				<SaveSelectedChordButton />
			</div>
		</div>
	);
};

export default Controller;