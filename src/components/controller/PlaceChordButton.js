import { useDispatch } from 'react-redux';
import { RiSortDesc } from 'react-icons/ri';

const PlaceChordButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		const chord = props.selectedChord.split(',');
		if (chord.length === 1) {
			if (chord[0] === '') return;
		}
		dispatch({ type: 'tabMaker/placeColumn', payload: chord });
	};

	return (
		<div className='control-button' onClick={onClick}>
			<RiSortDesc />
		</div>
	);
};

export default PlaceChordButton;
