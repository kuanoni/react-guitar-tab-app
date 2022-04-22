import { useDispatch } from 'react-redux';

const MoveSelectionLeftButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/moveSelectedColumn', payload: -1 });
	};

	return <div onClick={onClick}>MoveLeft</div>;
};

export default MoveSelectionLeftButton;
