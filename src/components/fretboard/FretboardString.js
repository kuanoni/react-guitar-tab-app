import { useDispatch, useSelector } from 'react-redux';
import { TUNINGS } from '../../GUITAR';
import FretButton from './FretButton';

const selectTuning = (state) => state.tabMaker.tuning;

const FretboardString = (props) => {
	const dispatch = useDispatch();
	const tunings = useSelector(selectTuning);

	const changeStringTuning = (e) => {
		dispatch({
			type: 'tabMaker/changeStringTuning',
			payload: {
				guitarString: props.guitarString,
				tuning: parseInt(e.target.value),
			},
		});
	};

	const stringTuningOptions = [...Array(84).keys()].map((num) => {
		return (
			<option key={num} value={num}>
				{TUNINGS[num]}
			</option>
		);
	});

	const fretNotes = [...Array(22).keys()].map((num) => {
		return num + tunings[props.guitarString];
	});

	return (
		<div className='fretboard-string'>
			<select className='tuning-selector' defaultValue={tunings[props.guitarString]} onChange={changeStringTuning}>
				{stringTuningOptions}
			</select>
            <div className={"string-line string-line-" + props.guitarString}></div>
			{fretNotes.map((fret, i) => {
				return <FretButton key={fret} fretNum={i} fretNote={fret} guitarString={props.guitarString} showNoteLabel={props.showNoteLabels} />;
			})}
		</div>
	);
};

export default FretboardString;
