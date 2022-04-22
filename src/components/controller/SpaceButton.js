import { useDispatch } from 'react-redux';
import { RiInsertColumnLeft } from "react-icons/ri";

const SpaceButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/addSpaceColumns' });
	};

	return <div className='control-button' onClick={onClick}><RiInsertColumnLeft /></div>;
};

export default SpaceButton;
