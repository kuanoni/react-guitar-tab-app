import { useDispatch } from 'react-redux';
import ControlButton from '../ControlButton';

const AddSlideUpButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/addLetterToNote',
			payload: '/',
		});
	};

	return (
		<ControlButton click={onClick} buttonName={'Slide Up'}>
			/
		</ControlButton>
	);
};

export default AddSlideUpButton;
