import { useDispatch } from 'react-redux';
import { RiDeleteRow } from 'react-icons/ri';

const DeleteBreakButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/deleteLastLineBreak' });
	};

	return (
		<div className='control-button' onClick={onClick}>
			<RiDeleteRow />
		</div>
	);
};

export default DeleteBreakButton;
