import { useDispatch } from 'react-redux';
import ControlButton from '../ControlButton';
import CustomIcon from '../CustomIcon';

const LineBreakButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/newLineBreak' });
	};

	return (
		<ControlButton click={onClick} buttonName={'New Line'}>
			<CustomIcon svgPath='line_add' />
		</ControlButton>
	);
};

export default LineBreakButton;
