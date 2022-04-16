import { useDispatch } from 'react-redux';
import { TUNINGS } from '../../GUITAR';

const FretButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		// payload: guitarString, value
		dispatch({
			type: 'tabMaker/setStringNote',
			payload: { guitarString: props.guitarString, note: props.fretNum, spaces: 2 },
		});
	};

	return (
		<div className='fretboard-btn' onClick={onClick}>
			{TUNINGS[props.fretNote]}
		</div>
	);
};

export default FretButton;
