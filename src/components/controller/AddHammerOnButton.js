import { useDispatch } from 'react-redux';

const AddHammerOnButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/addLetterToNote',
			payload: 'h',
		});
	};

	return <div className='control-button' onClick={onClick}>h</div>;
};

export default AddHammerOnButton;
