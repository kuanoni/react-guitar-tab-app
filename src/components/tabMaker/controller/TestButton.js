import { useDispatch } from 'react-redux';
import ControlButton from './ControlButton';

const TestButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/transposeNotes', payload: -1 });
	};

	return (
		<ControlButton click={onClick} buttonName={'Test'}>
            T
        </ControlButton>
	);
};

export default TestButton;
