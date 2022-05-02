import { useDispatch } from 'react-redux';
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
            X
        </ControlButton>
	);
};

export default DeleteModifierButton;
