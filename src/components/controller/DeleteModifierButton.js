import { useDispatch } from 'react-redux';
import { RiCloseFill } from 'react-icons/ri'
import ControlButton from './ControlButton';

const DeleteModifierButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/deleteModifier'
		});
	};

	return (
		<ControlButton click={onClick} buttonName={'Delete Modifier'}>
            <RiCloseFill />
        </ControlButton>
	);
};

export default DeleteModifierButton;
