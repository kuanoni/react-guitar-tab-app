import { useDispatch, useSelector } from 'react-redux';

const selectedColumnSelector = (state) => state.tabMaker.selectedColumn;

const MoveSelectionLeftButton = () => {
	const dispatch = useDispatch();
	const selectedColumn = useSelector(selectedColumnSelector);

	const onClick = () => {
		dispatch({ type: 'tabMaker/moveSelectedColumn', payload: -1 });
	};

	return <div onClick={onClick}>MoveLeft</div>;
};

export default MoveSelectionLeftButton;
