import { useDispatch } from 'react-redux';
import { RiArrowLeftLine } from "react-icons/ri";

const MoveSelectionLeftButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/moveSelectedColumn', payload: -1 });
	};

	return <div className='control-button' onClick={onClick}><RiArrowLeftLine /></div>;
};

export default MoveSelectionLeftButton;
