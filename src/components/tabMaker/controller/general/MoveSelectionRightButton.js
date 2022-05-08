import { useDispatch } from 'react-redux';
import { RiArrowRightLine } from 'react-icons/ri';
import ControlButton from '../ControlButton';

const MoveSelectionRightButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/moveSelectedColumn', payload: 1 });
	};

	return (
		<ControlButton click={onClick}>
			<RiArrowRightLine />
		</ControlButton>
	);
};

export default MoveSelectionRightButton;
