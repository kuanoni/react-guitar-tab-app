import { useSelector } from 'react-redux';
import { CHORDS } from '../../GUITAR';

const selectSavedChords = (state) => state.tabMaker.savedChords;

const SelectChordDropdown = (props) => {
	const savedChords = useSelector(selectSavedChords);

	let options = [];
	for (const key in CHORDS) {
		options.push(
			<option key={key} value={CHORDS[key].column}>
				{CHORDS[key].name}
			</option>
		);
	}

	savedChords.forEach((chord, i) => {
		options.push(
			<option key={i} value={chord.column}>
				{chord.name}
			</option>
		);
	});

	const onChange = (e) => {
		props.setSelectedChord(e.target.value);
	};

	return (
		<select className='chord-selector' name='chord' onChange={onChange}>
			<option value=''>- - -</option>
			{options}
		</select>
	);
};

export default SelectChordDropdown;
