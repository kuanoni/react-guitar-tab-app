import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TUNINGS } from '../../GUITAR';

const FretButton = (props) => {
	const dispatch = useDispatch();
	let sound;

	useEffect(() => {
		try {
			sound = new Audio(require('../../sounds/guitar-' + TUNINGS[props.fretNote].replace('#', 's') + '.wav'));
			//console.log('../../sounds/guitar-' + TUNINGS[props.fretNote].replace('#', 's') + '.wav')
		} catch (ex) {}
	}, [props.fretNote]);

	const onClick = () => {
		dispatch({
			type: 'tabMaker/setStringNote',
			payload: { guitarString: props.guitarString, note: props.fretNum, spaces: 2 },
		});

		if (sound) {
			sound.play();
		}
	};

	return (
		<div className='fretboard-btn' onClick={onClick}>
			{TUNINGS[props.fretNote]}
		</div>
	);
};

export default FretButton;
