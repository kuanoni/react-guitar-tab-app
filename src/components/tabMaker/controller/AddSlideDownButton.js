import { useDispatch } from 'react-redux';
import ControlButton from './ControlButton';

const AddSlideDownButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/addLetterToNote',
			payload: '\\',
		});
	};

	return (
		<ControlButton click={onClick} buttonName={'Slide Down'}>
			\
		</ControlButton>
	);
};

export default AddSlideDownButton;
