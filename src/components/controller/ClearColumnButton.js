import { useDispatch } from 'react-redux';

const ClearColumnButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/clearSelectedColumn' });
	};

	return <div onClick={onClick}>ClearColumnButton</div>;
};

export default ClearColumnButton;
