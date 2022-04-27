import { useDispatch } from 'react-redux';
import { RiInsertColumnLeft } from 'react-icons/ri';
import ControlButton from './ControlButton';

const SpaceButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/addSpaceColumn' });
	};

    return (
		<ControlButton click={onClick} buttonName={'Add Space'}>
            <RiInsertColumnLeft />
        </ControlButton>
	);
};

export default SpaceButton;
