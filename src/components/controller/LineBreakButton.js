import { useDispatch } from 'react-redux';

const LineBreakButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/changeColumnToLineBreak' });
	};

	return <div onClick={onClick}>LineBreak</div>;
};

export default LineBreakButton;
