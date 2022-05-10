import { useDispatch } from 'react-redux';
import ControlButton from '../ControlButton';
import CustomIcon from '../CustomIcon';

const ResetTablatureButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/resetTablature'});
	};

	return (
		<ControlButton click={onClick} buttonName={'Reset ALL Tablature'}>
			<CustomIcon svgPath='reset' />
		</ControlButton>
	);
};

export default ResetTablatureButton;
