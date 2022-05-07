import { useDispatch } from 'react-redux';
import { RiDeleteColumn } from 'react-icons/ri';
import ControlButton from './ControlButton';
import CustomIcon from './CustomIcon';

const DeleteColumnButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/deleteSelectedColumn' });
	};

	return (
		<ControlButton click={onClick} buttonName={'Delete Column'}>
			{/* <RiDeleteColumn /> */}
			<CustomIcon svgPath='column_delete' />
		</ControlButton>
	);
};

export default DeleteColumnButton;
