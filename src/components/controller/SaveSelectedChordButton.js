import { useDispatch } from 'react-redux';
import { RiAddFill } from 'react-icons/ri';
import { useState } from 'react';

const SaveSelectedChordButton = (props) => {
	const dispatch = useDispatch();
	const [chordName, setChordName] = useState('');

	const onClick = () => {
		if (chordName === '') return;
		dispatch({ type: 'tabMaker/saveSelectedChord', payload: chordName });
		setChordName('');
	};

	const handleInputChange = (e) => {
		setChordName(e.target.value);
	};

	return (
		<>
			<input
				className='chord-name-input'
				type='text'
				placeholder='Chord name...'
				value={chordName}
				onChange={handleInputChange}
			/>
			<div className='control-button' onClick={onClick}>
				<RiAddFill />
			</div>
		</>
	);
};

export default SaveSelectedChordButton;
