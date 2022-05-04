import { useDispatch, useSelector } from 'react-redux';
import { RiAddFill } from 'react-icons/ri';
import { useEffect, useRef, useState } from 'react';
import ControlButton from './ControlButton';

const SaveSelectedChordButton = (props) => {
	const dispatch = useDispatch();
	const inputRef = useRef(null);

	const onClick = () => {
		if (inputRef.current.value === '') return;
		dispatch({ type: 'tabMaker/saveSelectedChord', payload: inputRef.current.value });
		inputRef.current.value = '';
	};

	const keyDownHandler = (e) => {
		if (e.keyCode === 13 || e.key === 'Enter') {
			if (inputRef.current.value === '') return;
			dispatch({ type: 'tabMaker/saveSelectedChord', payload: inputRef.current.value });
			inputRef.current.value = '';
		}
	};

	useEffect(() => {
		inputRef.current.addEventListener('keydown', keyDownHandler, false);
		return () => {
			inputRef.current.removeEventListener('keydown', keyDownHandler);
		};
	}, []);

	return (
		<>
			<input ref={inputRef} className='chord-name-input' type='text' placeholder='Chord name...' />
			<ControlButton click={onClick} buttonName={'Save Chord'}>
				<RiAddFill />
			</ControlButton>
		</>
	);
};

export default SaveSelectedChordButton;
