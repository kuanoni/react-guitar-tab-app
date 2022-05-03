import { useDispatch } from 'react-redux';
import { RiDeleteRow } from 'react-icons/ri';
import ControlButton from './ControlButton';

const DeleteBreakButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/deleteLastLineBreak' });
	};

	return (
		<ControlButton click={onClick} buttonName={'Delete Line'}>
            <RiDeleteRow />
        </ControlButton>
	);
};

export default DeleteBreakButton;
