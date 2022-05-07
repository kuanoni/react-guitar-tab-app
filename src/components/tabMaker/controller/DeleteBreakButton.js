import { useDispatch } from 'react-redux';
import ControlButton from './ControlButton';
import CustomIcon from './CustomIcon';

const DeleteBreakButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/deleteLastLineBreak' });
	};

	return (
		<ControlButton click={onClick} buttonName={'Delete Line'}>
			<CustomIcon svgPath='line_delete' />
		</ControlButton>
	);
};

export default DeleteBreakButton;
