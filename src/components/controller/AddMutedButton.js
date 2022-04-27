import { useDispatch } from 'react-redux';
import ControlButton from './ControlButton';

const AddMutedButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/replaceNotesInColumn',
			payload: 'x',
		});
	};

	return (
		<ControlButton click={onClick} buttonName={'Muted'}>
            x
        </ControlButton>
	);
};

export default AddMutedButton;
