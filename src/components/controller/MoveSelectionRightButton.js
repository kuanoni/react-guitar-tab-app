import { useDispatch } from 'react-redux';

const MoveSelectionRightButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/moveSelectedColumn', payload: 1 });
	};

	return <div onClick={onClick}>MoveRight</div>;
};

export default MoveSelectionRightButton;
