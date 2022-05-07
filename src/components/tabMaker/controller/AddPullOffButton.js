import { useDispatch } from 'react-redux';
import ControlButton from './ControlButton';

const AddPullOffButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/addLetterToNote',
			payload: 'p',
		});
	};

	return (
		<ControlButton click={onClick} buttonName={'Pulloff'}>
			p
		</ControlButton>
	);
};

export default AddPullOffButton;
