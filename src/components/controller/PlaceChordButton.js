import { useDispatch } from 'react-redux';
import { RiSortDesc } from 'react-icons/ri';
import ControlButton from './ControlButton';

const PlaceChordButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/placeColumn', payload: props.selectedChord.column });
	};

    return (
		<ControlButton click={onClick} buttonName={'Place Chord'}>
            <RiSortDesc />
        </ControlButton>
	);
};

export default PlaceChordButton;
