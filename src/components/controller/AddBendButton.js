import { useDispatch } from 'react-redux';

const AddBendButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/addLetterToNote',
			payload: 'b',
		});
	};

	return <div className='control-button' onClick={onClick}>b</div>;
};

export default AddBendButton;
