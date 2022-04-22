import { useDispatch } from 'react-redux';
import { RiArrowRightLine } from "react-icons/ri";

const MoveSelectionRightButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/moveSelectedColumn', payload: 1 });
	};

	return <div className='control-button' onClick={onClick}><RiArrowRightLine /></div>;
};

export default MoveSelectionRightButton;
