import { useDispatch } from 'react-redux';

const AddSlideDownButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/addLetterToNote',
			payload: '\\',
		});
	};

	return <div className='control-button' onClick={onClick}>\</div>;
};

export default AddSlideDownButton;
