import { useDispatch } from 'react-redux';
import { RiArrowGoBackLine } from 'react-icons/ri';
import ControlButton from './ControlButton';

const UndoButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/undoToHistory' });
	};

    return (
		<ControlButton click={onClick} buttonName={'Undo'}>
            <RiArrowGoBackLine />
        </ControlButton>
	);
};

export default UndoButton;
