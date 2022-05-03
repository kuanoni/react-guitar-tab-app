import { useDispatch } from 'react-redux';
import { RiArrowLeftLine } from 'react-icons/ri';
import ControlButton from './ControlButton';

const MoveSelectionLeftButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/moveSelectedColumn', payload: -1 });
	};

	return (
		<ControlButton click={onClick}>
            <RiArrowLeftLine />
        </ControlButton>
	);
};

export default MoveSelectionLeftButton;
