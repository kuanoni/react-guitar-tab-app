import { useDispatch } from 'react-redux';
import { TUNINGS, TUNING_SOUNDS } from '../../GUITAR';

const FretButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/setStringNote',
			payload: { guitarString: props.guitarString, note: props.fretNum, spaces: 2 },
		});

		if (TUNING_SOUNDS[TUNINGS[props.fretNote]]) TUNING_SOUNDS[TUNINGS[props.fretNote]].play();
	};

	return (
		<div className='fretboard-btn' onClick={onClick}>
			{TUNINGS[props.fretNote]}
		</div>
	);
};

export default FretButton;
