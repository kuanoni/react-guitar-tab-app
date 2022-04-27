import { useDispatch } from 'react-redux';
import { RiInsertColumnLeft } from 'react-icons/ri';

const SpaceButton = () => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({ type: 'tabMaker/addSpaceColumn' });
	};

	return (
		<div className='control-button' onClick={onClick}>
			<RiInsertColumnLeft />
		</div>
	);
};

export default SpaceButton;
