import { useDispatch } from 'react-redux';
import { RiLayoutColumnLine } from 'react-icons/ri';
import ControlButton from './ControlButton';
import CustomIcon from './CustomIcon';

const ChangeToDivider = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/changeColumnToDivider' });
	};

	return (
		<ControlButton click={onClick} buttonName={'Add Divider'}>
            {/* <RiLayoutColumnLine /> */}
            <CustomIcon svgPath='column_divider' />
        </ControlButton>
	);
};

export default ChangeToDivider;
