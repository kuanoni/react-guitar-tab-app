import { useSelector } from 'react-redux';
import { CHORDS } from '../../GUITAR';

const selectSavedChords = (state) => state.tabMaker.savedChords;

const SelectChordDropdown = (props) => {
	const savedChords = useSelector(selectSavedChords);

	let options = [];
	for (const key in CHORDS) {
		options.push(
			<option key={key} value={key}>
				{CHORDS[key].name}
			</option>
		);
	}

	savedChords.forEach((chord, i) => {
		options.push(
			<option key={i} value={i}>
				{chord.name}
			</option>
		);
	});

	const onChange = (e) => {
		props.setSelectedChord(savedChords[e.target.value]);
	};

	return (
		<select className='chord-selector' name='chord' onChange={onChange}>
			<option value=''>- - -</option>
			{options}
		</select>
	);
};

export default SelectChordDropdown;
