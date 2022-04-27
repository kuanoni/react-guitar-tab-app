import { useDispatch } from 'react-redux';
import { RiParenthesesFill } from 'react-icons/ri';

const AddGhostNoteButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/wrapNote',
			payload: { left: '(', right: ')' },
		});
	};

	return (
		<div className='control-button' onClick={onClick}>
			<RiParenthesesFill />
		</div>
	);
};

export default AddGhostNoteButton;
