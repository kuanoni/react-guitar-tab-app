import { useDispatch } from 'react-redux';
import ControlButton from '../ControlButton';
import CustomIcon from '../CustomIcon';

const ChangeColumnToDivider = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/changeColumnToDivider' });
	};

	return (
		<ControlButton click={onClick} buttonName={'Add Divider'}>
			<CustomIcon svgPath='column_divider' />
		</ControlButton>
	);
};

export default ChangeColumnToDivider;
