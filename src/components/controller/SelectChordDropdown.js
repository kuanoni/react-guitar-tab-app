import { useSelector } from 'react-redux';
import { CHORDS } from '../../GUITAR';

const selectSavedChords = (state) => state.tabMaker.savedChords;

const SelectChordDropdown = (props) => {
	const savedChords = useSelector(selectSavedChords);

	let options = [];
	for (const key in CHORDS) {
		options.push(
            CHORDS[key]
		);
	}

	savedChords.forEach((chord, i) => {
		options.push(
            chord
		);
	});

    const optionsElements = options.map((chord, i) => {
        return (
            <option key={i} value={i}>
                {chord.name}
            </option>
        )
    })

	const onChange = (e) => {
		props.setSelectedChord(options[e.target.value]);
	};

	return (
		<select className='chord-selector' name='chord' onChange={onChange}>
			<option value=''>- - -</option>
			{optionsElements}
		</select>
	);
};

export default SelectChordDropdown;
