import { useDispatch } from 'react-redux';
import ControlButton from '../ControlButton';

const AddTapButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/addLetterToNote',
			payload: 't',
		});
	};

	return (
		<ControlButton click={onClick} buttonName={'Tapping'}>
			t
		</ControlButton>
	);
};

export default AddTapButton;
