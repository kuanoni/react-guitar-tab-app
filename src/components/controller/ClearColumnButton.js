import { useDispatch } from 'react-redux';
import { RiDeleteColumn } from 'react-icons/ri';
import ControlButton from './ControlButton';

const ClearColumnButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/clearSelectedColumn' });
	};

	return (
		<ControlButton click={onClick} buttonName={'Clear Column'}>
            <RiDeleteColumn />
        </ControlButton>
	);
};

export default ClearColumnButton;
