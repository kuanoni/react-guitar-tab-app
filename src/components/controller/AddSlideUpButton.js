import { useDispatch } from 'react-redux';

const AddSlideUpButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/addLetterToNote',
			payload: '/',
		});
	};

	return (
		<div className='control-button' onClick={onClick}>
			/
		</div>
	);
};

export default AddSlideUpButton;
