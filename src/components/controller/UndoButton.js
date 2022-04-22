import { useDispatch } from 'react-redux';
import { RiArrowGoBackLine } from "react-icons/ri";

const UndoButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/undoToHistory' });
	};

	return <div className='control-button' onClick={onClick}><RiArrowGoBackLine /></div>;
};

export default UndoButton;
