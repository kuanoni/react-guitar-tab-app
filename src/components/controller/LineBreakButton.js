import { useDispatch } from 'react-redux';
import { RiInsertRowBottom } from 'react-icons/ri';
import ControlButton from './ControlButton';

const LineBreakButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/newLineBreak' });
	};

	return (
		<ControlButton click={onClick} buttonName={'New Line'}>
            <RiInsertRowBottom />
        </ControlButton>
	);
};

export default LineBreakButton;
