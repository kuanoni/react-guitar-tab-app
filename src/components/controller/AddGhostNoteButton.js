import { useDispatch } from 'react-redux';

const AddGhostNoteButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/wrapNote',
			payload: { left: '(', right: ')' },
		});
	};

	return <div className='control-button' onClick={onClick}>()</div>;
};

export default AddGhostNoteButton;
