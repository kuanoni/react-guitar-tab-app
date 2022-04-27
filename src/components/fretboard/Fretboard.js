import { useDispatch, useSelector } from 'react-redux';
import FretboardString from './FretboardString';
import './fretboard.scss';
import { useState } from 'react';
import { guitarTunings } from '../../GUITAR';

const selectTuning = (state) => state.tabMaker.tuning;

const Fretboard = () => {
    const dispatch = useDispatch();
	const tuning = useSelector(selectTuning);
    const [showNoteLabels, setShowNoteLabels] = useState(false);

    let options = [];
	for (const key in guitarTunings) {
		options.push(
			<option key={key} value={guitarTunings[key].tuning}>
				{guitarTunings[key].name}
			</option>
		);
	}

    const handleChange = (e) => {
        if (e.target.value === '') return;
        const guitarTuning = e.target.value.split(',').map(x => parseInt(x))
        dispatch({ type: 'tabMaker/changeGuitarTuning', payload: guitarTuning });
    }

	return (
		<div className='fretboard-wrapper'>
			<div className='fretboard'>
				<div className='fretboard-labels'>
                <select className='tunings-selector' onChange={handleChange}>
                    {options}
                </select>
					{[...Array(22).keys()].map((i) => (
						<span key={i}>{i}</span>
					))}
				</div>
				<FretboardString guitarString={5} stringTuning={tuning[5]} showNoteLabels={showNoteLabels} />
				<FretboardString guitarString={4} stringTuning={tuning[4]} showNoteLabels={showNoteLabels} />
				<FretboardString guitarString={3} stringTuning={tuning[3]} showNoteLabels={showNoteLabels} />
				<FretboardString guitarString={2} stringTuning={tuning[2]} showNoteLabels={showNoteLabels} />
				<FretboardString guitarString={1} stringTuning={tuning[1]} showNoteLabels={showNoteLabels} />
				<FretboardString guitarString={0} stringTuning={tuning[0]} showNoteLabels={showNoteLabels} />
			</div>
		</div>
	);
};

export default Fretboard;
