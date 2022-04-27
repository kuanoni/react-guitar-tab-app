import { useDispatch } from 'react-redux';
import { TUNINGS, TUNING_SOUNDS } from '../../GUITAR';

const FretButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/setStringNote',
			payload: { guitarString: props.guitarString, note: props.fretNum, spaces: 2 },
		});

		if (TUNING_SOUNDS[TUNINGS[props.fretNote]]) {
			TUNING_SOUNDS[TUNINGS[props.fretNote]].currentTime = 0;
			TUNING_SOUNDS[TUNINGS[props.fretNote]].volume = 0.25;
			TUNING_SOUNDS[TUNINGS[props.fretNote]].play();
		}
	};

	// add dots on the fretboard
	const addDot = () => {
		if (props.guitarString === 3 && props.fretNum === 3) return <div className='fret-dot'></div>;
		if (props.guitarString === 3 && props.fretNum === 5) return <div className='fret-dot'></div>;
		if (props.guitarString === 3 && props.fretNum === 7) return <div className='fret-dot'></div>;
		if (props.guitarString === 3 && props.fretNum === 9) return <div className='fret-dot'></div>;
		if (props.guitarString === 3 && props.fretNum === 15) return <div className='fret-dot'></div>;
		if (props.guitarString === 3 && props.fretNum === 17) return <div className='fret-dot'></div>;
		if (props.guitarString === 3 && props.fretNum === 19) return <div className='fret-dot'></div>;
		if (props.guitarString === 3 && props.fretNum === 21) return <div className='fret-dot'></div>;

		if (props.guitarString === 4 && props.fretNum === 12) return <div className='fret-dot middle'></div>;
		if (props.guitarString === 1 && props.fretNum === 12) return <div className='fret-dot middle'></div>;
	};

	return (
		<div className='fretboard-btn' onClick={onClick}>
			{addDot()}
			{props.showNoteLabel && TUNINGS[props.fretNote]}
		</div>
	);
};

export default FretButton;
