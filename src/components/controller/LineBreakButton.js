import { useDispatch } from 'react-redux';
import { RiInsertRowBottom } from "react-icons/ri";

const LineBreakButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/newLineBreak' });
	};

	return <div className='control-button' onClick={onClick}><RiInsertRowBottom /></div>;
};

export default LineBreakButton;
