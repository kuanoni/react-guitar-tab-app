import React, { useState } from 'react';
import './controller.scss';

import MoveSelectionLeftButton from './general/MoveSelectionLeftButton';
import MoveSelectionRightButton from './general/MoveSelectionRightButton';
import UndoButton from './general/UndoButton';

import AddHammerOnButton from './additions/AddHammerOnButton';
import AddPullOffButton from './additions/AddPullOffButton';
import AddMutedButton from './additions/AddMutedButton';
import AddBendButton from './additions/AddBendButton';
import AddSlideUpButton from './additions/AddSlideUpButton';
import AddSlideDownButton from './additions/AddSlideDownButton';
import AddGhostNoteButton from './wrappers/AddGhostNoteButton';
import AddNaturalHarmonicButton from './wrappers/AddNaturalHarmonicButton';

import PalmMuteButton from './modifiers/PalmMuteButton';
import VibratoButton from './modifiers/VibratoButton';
import DeleteModifierButton from './modifiers/DeleteModifierButton';

import ClearColumnButton from './columns/ClearColumnButton';
import DeleteColumnButton from './columns/DeleteColumnButton';
import ChangeToDividerButton from './columns/ChangeToDividerButton';
import AddSpaceColumnButton from './columns/AddSpaceColumnButton';
import LineBreakButton from './lines/LineBreakButton';
import DeleteBreakButton from './lines/DeleteBreakButton';

import SelectChordDropdown from './chords/SelectChordDropdown';
import PlaceChordButton from './chords/PlaceChordButton';
import SaveSelectedChordButton from './chords/SaveSelectedChordButton';
import AddTapButton from './additions/AddTapButton';
import AutomoveToggle from './general/AutomoveToggle';

const Controller = () => {
	const [selectedChord, setSelectedChord] = useState('');

	return (
		<div className='controller-wrapper'>
			<div className='controller'>
				<MoveSelectionLeftButton />
				<MoveSelectionRightButton />
				<UndoButton />
				{/* <TestButton /> */}
				<div className='divider'></div>
				<AddHammerOnButton />
				<AddPullOffButton />
                <AddTapButton />
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
			</div>
            <div className="controller">
				<SelectChordDropdown selectedChord={selectedChord} setSelectedChord={setSelectedChord} />
				<PlaceChordButton selectedChord={selectedChord} />
				<SaveSelectedChordButton setSelectedChord={setSelectedChord} />
				<div className='divider'></div>
				<ClearColumnButton />
				<DeleteColumnButton />
				<ChangeToDividerButton />
				<AddSpaceColumnButton />
				<LineBreakButton />
				<DeleteBreakButton />
                <div className="divider"></div>
                <AutomoveToggle />
            </div>
		</div>
	);
};

export default Controller;
