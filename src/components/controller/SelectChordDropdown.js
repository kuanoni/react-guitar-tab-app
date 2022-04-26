import { CHORDS } from '../../GUITAR';

const SelectChordDropdown = (props) => {
	let options = [];
	for (const key in CHORDS) {
		options.push(
			<option key={key} value={CHORDS[key].column}>
				{CHORDS[key].name}
			</option>
		);
	}

    const onChange = e => {
        props.setSelectedChord(e.target.value);
    }

	return (
		<select className='chord-selector' name='chord' onChange={onChange}>
			<option value=''>- - -</option>
			{options}
		</select>
	);
};

export default SelectChordDropdown;
