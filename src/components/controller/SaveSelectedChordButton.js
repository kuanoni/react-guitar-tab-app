import { useDispatch } from 'react-redux';
import { RiDeleteColumn } from "react-icons/ri";

const SaveSelectedChordButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/saveSelectedChord' });
	};

	return <div className='control-button' onClick={onClick}>S</div>;
};

export default SaveSelectedChordButton;
