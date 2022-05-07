import { useDispatch } from 'react-redux';
import ControlButton from './ControlButton';

const AddBendButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/addLetterToNote',
			payload: 'b',
		});
	};

	return (
		<ControlButton click={onClick} buttonName={'Bend'}>
			b
		</ControlButton>
	);
};

export default AddBendButton;
