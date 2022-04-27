import { useDispatch } from 'react-redux';
import { RiSortDesc } from 'react-icons/ri';
import ControlButton from './ControlButton';

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
		<ControlButton click={onClick} buttonName={'Place Chord'}>
            <RiSortDesc />
        </ControlButton>
	);
};

export default PlaceChordButton;
