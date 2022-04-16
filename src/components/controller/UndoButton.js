import { useDispatch } from 'react-redux';

const UndoButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/undoToHistory' });
	};

	return <div onClick={onClick}>UndoButton</div>;
};

export default UndoButton;
