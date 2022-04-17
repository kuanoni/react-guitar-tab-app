import { useDispatch } from 'react-redux';

const DeleteBreakButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/deleteLastLineBreak' });
	};

	return <div onClick={onClick}>DeleteLineBreak</div>;
};

export default DeleteBreakButton;
