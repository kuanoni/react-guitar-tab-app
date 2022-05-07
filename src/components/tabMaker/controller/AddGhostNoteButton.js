import { useDispatch } from 'react-redux';
import { RiParenthesesFill } from 'react-icons/ri';
import ControlButton from './ControlButton';

const AddGhostNoteButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/wrapNote',
			payload: { left: '(', right: ')' },
		});
	};

	return (
		<ControlButton click={onClick} buttonName={'Ghost Note'}>
			<RiParenthesesFill />
		</ControlButton>
	);
};

export default AddGhostNoteButton;
