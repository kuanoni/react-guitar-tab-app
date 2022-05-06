import { useDispatch } from 'react-redux';
import { RiInsertColumnLeft } from 'react-icons/ri';
import ControlButton from './ControlButton';
import CustomIcon from './CustomIcon';

const SpaceButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/addSpaceColumn' });
	};

    return (
		<ControlButton click={onClick} buttonName={'Add Space'}>
            {/* <RiInsertColumnLeft /> */}
            <CustomIcon svgPath='column_add' />
        </ControlButton>
	);
};

export default SpaceButton;
