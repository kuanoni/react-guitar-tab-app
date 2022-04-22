import { useDispatch } from 'react-redux';
import { RiDeleteColumn } from "react-icons/ri";

const ClearColumnButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/clearSelectedColumn' });
	};

	return <div className='control-button' onClick={onClick}><RiDeleteColumn /></div>;
};

export default ClearColumnButton;
