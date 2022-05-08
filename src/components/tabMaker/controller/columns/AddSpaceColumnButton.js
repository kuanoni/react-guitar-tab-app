import { useDispatch } from 'react-redux';
import ControlButton from '../ControlButton';
import CustomIcon from '../CustomIcon';

const AddSpaceColumn = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/addSpaceColumn' });
	};

	return (
		<ControlButton click={onClick} buttonName={'Add Space'}>
			<CustomIcon svgPath='column_add' />
		</ControlButton>
	);
};

export default AddSpaceColumn;
