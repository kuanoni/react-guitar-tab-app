import { useDispatch } from 'react-redux';

const LineBreakButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/newLineBreak' });
	};

	return <div onClick={onClick}>LineBreak</div>;
};

export default LineBreakButton;
