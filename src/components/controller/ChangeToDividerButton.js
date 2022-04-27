import { useDispatch } from 'react-redux';
import { RiLayoutColumnLine } from 'react-icons/ri';

const ChangeToDivider = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/changeColumnToDivider' });
	};

	return (
		<div className='control-button' onClick={onClick}>
			<RiLayoutColumnLine />
		</div>
	);
};

export default ChangeToDivider;
