import { useDispatch } from 'react-redux';
import ControlButton from '../ControlButton';
import CustomIcon from '../CustomIcon';

const ClearColumnButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/clearSelectedColumn' });
	};

	return (
		<ControlButton click={onClick} buttonName={'Clear Column'}>
			{/* <RiDeleteColumn /> */}
			<CustomIcon svgPath='column_clear' />
		</ControlButton>
	);
};

export default ClearColumnButton;
