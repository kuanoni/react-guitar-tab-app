import { useDispatch } from 'react-redux';
import ControlButton from './ControlButton';

const AddHammerOnButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/addLetterToNote',
			payload: 'h',
		});
	};

    return (
		<ControlButton click={onClick} buttonName={'Hammer-On'}>
            h
        </ControlButton>
	);
};

export default AddHammerOnButton;
