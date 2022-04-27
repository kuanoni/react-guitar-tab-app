import { useDispatch } from 'react-redux';
import { RiAddFill } from 'react-icons/ri';
import { useState } from 'react';
import ControlButton from './ControlButton';

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
            <ControlButton click={onClick} buttonName={'Save Chord'}>
                <RiAddFill />
            </ControlButton>
		</>
	);
};

export default SaveSelectedChordButton;
