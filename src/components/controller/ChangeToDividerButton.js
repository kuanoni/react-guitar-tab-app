import { useDispatch } from 'react-redux';
import { RiLayoutColumnLine } from 'react-icons/ri';
import ControlButton from './ControlButton';

const ChangeToDivider = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/changeColumnToDivider' });
	};

	return (
		<ControlButton click={onClick} buttonName={'Add Divider'}>
            <RiLayoutColumnLine />
        </ControlButton>
	);
};

export default ChangeToDivider;
